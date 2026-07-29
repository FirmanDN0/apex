import { cn } from '@/lib/utils';
import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  glow?: boolean;
}

export function Card({ className, hoverEffect = false, glow = false, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'relative rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-6 backdrop-blur-md overflow-hidden transition-all duration-300',
        hoverEffect && 'hover:border-zinc-700 hover:bg-zinc-900/90 hover:shadow-2xl hover:shadow-black/60 hover:-translate-y-0.5',
        glow && 'before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-b before:from-indigo-500/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex flex-col gap-1 mb-4', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('text-lg font-semibold text-zinc-100 tracking-tight', className)} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-xs text-zinc-400 leading-relaxed', className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between', className)} {...props}>
      {children}
    </div>
  );
}
