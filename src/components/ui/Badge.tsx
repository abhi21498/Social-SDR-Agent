import React from 'react';

export const Badge = ({ className, variant = 'default', children }: { className?: string; variant?: 'default' | 'secondary' | 'destructive' | 'outline'; children: React.ReactNode }) => {
  const variants: Record<string, string> = {
    default: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    destructive: 'bg-destructive text-destructive-foreground',
    outline: 'border border-input bg-background text-foreground',
  };
  const base = 'inline-flex items-center justify-center rounded-border px-2.5 py-0.5 text-xs font-medium transition-colors';
  const variantCls = variants[variant] || variants.default;
  
  return (
    <div className={`${base} ${variantCls} ${className}`}>
      {children}
    </div>
  );
};
