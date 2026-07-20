import React from 'react';

export const CardHeader = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
      {children}
    </div>
  );
};
