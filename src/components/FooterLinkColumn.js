// src/components/FooterLinkColumn.js
import Link from 'next/link';

export default function FooterLinkColumn({ title, links }) {
  return (
    <div>
      <h4 className="font-bold mb-6 text-lg text-gray-100 uppercase tracking-wider">
        {title}
      </h4>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-gray-300 hover:text-primary transition-colors duration-200 flex items-center gap-3 group"
            >
              <link.icon 
                className="text-primary group-hover:scale-110 transition-transform" 
                aria-hidden="true"
              />
              <span className="text-sm">{link.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}