// src/app/api/professionals/route.js
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { validateProfessionalData } from '../../../utils/validation';
import { verifyToken } from '../../../utils/auth';

// Configuración de paginación
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

export async function GET(request) {
  try {
    // 1. Verificar autenticación
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    const tokenError = await verifyToken(token);
    
    if (tokenError) {
      return NextResponse.json(
        { error: tokenError.message },
        { status: tokenError.status }
      );
    }

    // 2. Procesar parámetros de consulta
    const { searchParams } = new URL(request.url);
    const service = searchParams.get('service');
    const search = searchParams.get('search');
    const limit = Math.min(parseInt(searchParams.get('limit')) || DEFAULT_LIMIT, MAX_LIMIT);
    const page = Math.max(parseInt(searchParams.get('page')) || 1, 1);
    const skip = (page - 1) * limit;

    // 3. Construir filtros de consulta
    const whereClause = {
      active: true,
      ...(service && {
        services: {
          some: { slug: service }
        }
      }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { profession: { contains: search, mode: 'insensitive' } },
          { area: { contains: search, mode: 'insensitive' } }
        ]
      })
    };

    // 4. Consulta optimizada a la base de datos
    const [professionals, totalCount] = await Promise.all([
      prisma.proCollaborator.findMany({
        where: whereClause,
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          profession: true,
          phone: true,
          area: true,
          photo: true,
          experience: true,
          verified: true,
          location: {
            select: {
              lat: true,
              lng: true,
              address: true
            }
          },
          services: {
            select: {
              slug: true,
              name: true,
              icon: true
            }
          },
          workPhotos: {
            take: 3,
            select: {
              url: true
            }
          },
          reviews: {
            select: {
              value: true
            }
          },
          _count: {
            select: {
              reviews: true
            }
          }
        },
        orderBy: [
          { verified: 'desc' },
          { reviews: { _count: 'desc' } }
        ]
      }),
      prisma.proCollaborator.count({ where: whereClause })
    ]);

    // 5. Procesar y enriquecer datos
    const enhancedProfessionals = professionals.map(pro => {
      const avgRating = pro.reviews.length > 0 
        ? parseFloat((pro.reviews.reduce((sum, r) => sum + r.value, 0) / pro.reviews.length).toFixed(1))
        : 0;

      return {
        ...pro,
        averageRating: avgRating,
        reviewCount: pro._count.reviews,
        services: pro.services,
        // Eliminar datos internos
        reviews: undefined,
        _count: undefined
      };
    });

    // 6. Retornar respuesta estructurada
    return NextResponse.json({
      success: true,
      data: enhancedProfessionals,
      meta: {
        pagination: {
          total: totalCount,
          page,
          limit,
          totalPages: Math.ceil(totalCount / limit),
          hasMore: page * limit < totalCount
        },
        filters: {
          service,
          search
        }
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Error fetching professionals:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    // 1. Verificar permisos de administrador
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    const adminCheck = await verifyToken(token, true);
    
    if (adminCheck) {
      return NextResponse.json(
        { error: adminCheck.message },
        { status: adminCheck.status }
      );
    }

    // 2. Validar datos de entrada
    const data = await request.json();
    const validationErrors = validateProfessionalData(data);
    
    if (validationErrors) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: validationErrors
        },
        { status: 400 }
      );
    }

    // 3. Crear profesional con transacción
    const result = await prisma.$transaction(async (prisma) => {
      const newProfessional = await prisma.proCollaborator.create({
        data: {
          name: data.name,
          email: data.email,
          profession: data.profession,
          area: data.area,
          phone: data.phone,
          photo: data.photo,
          experience: data.experience,
          verified: data.verified || false,
          location: data.location ? {
            create: {
              lat: data.location.lat,
              lng: data.location.lng,
              address: data.location.address
            }
          } : undefined,
          services: {
            connect: data.services?.map(id => ({ id })) || []
          },
          workPhotos: {
            create: data.workPhotos?.map(url => ({ url })) || []
          }
        },
        include: {
          services: true,
          workPhotos: true,
          location: true
        }
      });

      // Crear áreas de trabajo si se especificaron
      if (data.workedAreas?.length > 0) {
        await prisma.workedArea.createMany({
          data: data.workedAreas.map(name => ({
            name,
            proCollaboratorId: newProfessional.id
          }))
        });
      }

      return newProfessional;
    });

    // 4. Retornar respuesta exitosa
    return NextResponse.json(
      { 
        success: true,
        message: 'Professional created successfully',
        data: result 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating professional:', error);

    // Manejar errores específicos
    if (error.code === 'P2002') {
      const field = error.meta?.target?.join(', ');
      return NextResponse.json(
        {
          success: false,
          error: 'Duplicate entry',
          message: `${field} already exists`
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to create professional',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}