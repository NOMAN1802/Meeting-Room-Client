import React from "react";
import { Link } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

export const generateBreadcrumbs = (items: BreadcrumbItem[]) => {
  return (
    <div className="flex items-center my-8">
      <ol className="flex w-full items-center overflow-hidden">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <li className="text-body hover:text-heading px-4 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
              {item.path ? (
                <Link to={item.path} className="capitalize">
                  {item.label}
                </Link>
              ) : (
                <span className="capitalize">{item.label}</span>
              )}
            </li>
            {index < items.length - 1 && (
              <li className="text-body mt-0.5 text-base">/</li>
            )}
          </React.Fragment>
        ))}
      </ol>
    </div>
  );
};
