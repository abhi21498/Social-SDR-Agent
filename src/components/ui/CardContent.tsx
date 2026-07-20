import React from 'react';

export const CardContent = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return (
    <div className={`p-6 pt-0 ${className}`}>
      {children}
    </div>
  );
};
