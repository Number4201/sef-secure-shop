
import * as React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface BreadcrumbProps extends React.ComponentPropsWithoutRef<"nav"> {
  children: React.ReactNode;
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn("flex items-center text-sm", className)}
        {...props}
      >
        <ol className="flex items-center flex-wrap gap-1.5">{children}</ol>
      </nav>
    );
  }
);
Breadcrumb.displayName = "Breadcrumb";

interface BreadcrumbItemProps extends React.ComponentPropsWithoutRef<"li"> {
  children: React.ReactNode;
}

const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={cn("inline-flex items-center gap-1.5", className)}
        {...props}
      >
        {children}
        <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
      </li>
    );
  }
);
BreadcrumbItem.displayName = "BreadcrumbItem";

interface BreadcrumbLinkProps extends React.ComponentPropsWithoutRef<typeof Link> {
  href?: string;
  isCurrentPage?: boolean;
  children: React.ReactNode;
}

const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ className, href, to, isCurrentPage = false, children, ...props }, ref) => {
    // Use href as to if to is not provided
    const linkTo = to || href || "";
    
    if (isCurrentPage) {
      return (
        <span
          className={cn("text-gray-600 font-medium", className)}
          aria-current="page"
        >
          {children}
        </span>
      );
    }

    return (
      <Link
        ref={ref}
        to={linkTo}
        className={cn(
          "text-gray-500 hover:text-esejfy-burgundy transition-colors animated-underline",
          className
        )}
        {...props}
      >
        {children}
      </Link>
    );
  }
);
BreadcrumbLink.displayName = "BreadcrumbLink";

interface BreadcrumbPageProps extends React.ComponentPropsWithoutRef<"span"> {
  children: React.ReactNode;
}

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        aria-current="page"
        className={cn("text-gray-600 font-medium", className)}
        {...props}
      />
    );
  }
);
BreadcrumbPage.displayName = "BreadcrumbPage";

export { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage };
