import React from 'react';
import { cn } from '@/lib/utils';

// Heading components
interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
}

export function H1({ children, className, ...props }: HeadingProps) {
  return (
    <h1 
      className={cn(
        "scroll-m-20 text-4xl font-bold tracking-tight text-foreground lg:text-5xl",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

export function H2({ children, className, ...props }: HeadingProps) {
  return (
    <h2 
      className={cn(
        "scroll-m-20 text-3xl font-semibold tracking-tight text-foreground first:mt-0",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

export function H3({ children, className, ...props }: HeadingProps) {
  return (
    <h3 
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

export function H4({ children, className, ...props }: HeadingProps) {
  return (
    <h4 
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </h4>
  );
}

// Paragraph components
interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'lead' | 'small' | 'muted';
}

export function P({ 
  children, 
  className, 
  variant = 'default',
  ...props 
}: ParagraphProps) {
  return (
    <p 
      className={cn(
        "text-base text-foreground",
        variant === 'lead' && "text-xl text-muted-foreground",
        variant === 'small' && "text-sm font-medium leading-none",
        variant === 'muted' && "text-sm text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

// Section title with decorative elements
interface SectionTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right';
  decorative?: boolean;
}

export function SectionTitle({ 
  title, 
  description, 
  icon, 
  className,
  align = 'center',
  decorative = true,
  ...props 
}: SectionTitleProps) {
  return (
    <div 
      className={cn(
        "mb-8",
        align === 'center' && "text-center",
        align === 'right' && "text-right",
        className
      )}
      {...props}
    >
      {decorative && (
        <div className={cn(
          "inline-block mb-2",
          align === 'center' && "mx-auto",
          align === 'right' && "ml-auto"
        )}>
          <div className="flex items-center justify-center">
            <div className="h-0.5 w-6 bg-esejfy-burgundy"></div>
            {icon ? (
              <div className="mx-2 text-esejfy-burgundy">
                {icon}
              </div>
            ) : (
              <div className="mx-2 text-esejfy-burgundy">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
            <div className="h-0.5 w-6 bg-esejfy-burgundy"></div>
          </div>
        </div>
      )}

      <h2 className="text-2xl md:text-3xl font-bold mb-3">{title}</h2>
      
      {description && (
        <p className="text-gray-800 font-medium text-base max-w-3xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}

// Blockquote component
interface BlockquoteProps extends React.HTMLAttributes<HTMLQuoteElement> {
  children: React.ReactNode;
  className?: string;
  citation?: string;
}

export function Blockquote({ 
  children, 
  className,
  citation,
  ...props 
}: BlockquoteProps) {
  return (
    <blockquote 
      className={cn(
        "mt-6 border-l-2 border-esejfy-burgundy pl-6 italic text-foreground",
        className
      )}
      {...props}
    >
      {children}
      {citation && (
        <cite className="block text-sm text-muted-foreground mt-2 not-italic">
          — {citation}
        </cite>
      )}
    </blockquote>
  );
}

// List components
interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
  className?: string;
}

export function UL({ 
  children, 
  className,
  ...props 
}: ListProps) {
  return (
    <ul 
      className={cn(
        "my-6 ml-6 list-disc [&>li]:mt-2",
        className
      )}
      {...props}
    >
      {children}
    </ul>
  );
}

interface OrderedListProps extends React.HTMLAttributes<HTMLOListElement> {
  children: React.ReactNode;
  className?: string;
}

export function OL({ 
  children, 
  className,
  ...props 
}: OrderedListProps) {
  return (
    <ol 
      className={cn(
        "my-6 ml-6 list-decimal [&>li]:mt-2",
        className
      )}
      {...props}
    >
      {children}
    </ol>
  );
}

// Inline code component
interface InlineCodeProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
}

export function InlineCode({ 
  children, 
  className,
  ...props 
}: InlineCodeProps) {
  return (
    <code 
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        className
      )}
      {...props}
    >
      {children}
    </code>
  );
}
