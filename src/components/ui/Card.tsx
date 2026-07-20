import React from 'react';

export const Card = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return (
    <div className={`rounded-border border bg-card text-card-foreground shadow-sm ${className}`}>
      {children}
    </div>
  );
};
