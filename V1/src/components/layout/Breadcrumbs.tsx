import { Link } from '@/i18n/navigation';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  // Generate schema.org JSON-LD
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Domů",
        "item": "https://strkan.cz/"
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.label,
        "item": `https://strkan.cz${item.href}`
      }))
    ]
  };

  return (
    <nav aria-label="Breadcrumb" className="py-4 text-sm text-brand-gray">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <ol className="flex items-center space-x-2">
        <li>
          <Link href="/" className="hover:text-brand-sky-blue transition-colors">
            Domů
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center space-x-2">
              <span className="text-brand-clean-gray/50">/</span>
              {isLast ? (
                <span className="text-brand-dark-blue font-semibold" aria-current="page">
                  {item.label}
                </span>
              ) : (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                <Link href={item.href as any} className="hover:text-brand-sky-blue transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
