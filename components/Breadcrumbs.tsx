import React from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {item.href ? (
            <a
              className="text-primary/80 dark:text-primary/70 text-base font-medium leading-normal hover:text-primary dark:hover:text-primary transition-colors"
              href={item.href}
            >
              {item.label}
            </a>
          ) : (
            <span
              className={`text-base font-medium leading-normal ${
                item.isActive
                  ? 'text-[#0c1d18] dark:text-white'
                  : 'text-primary/80 dark:text-primary/70'
              }`}
            >
              {item.label}
            </span>
          )}
          {index < items.length - 1 && (
            <span className="text-primary/80 dark:text-primary/70 text-base font-medium leading-normal">
              /
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs;