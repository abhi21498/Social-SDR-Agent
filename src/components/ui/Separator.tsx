import React from 'react';

export const Separator = ({ className, children }: { className?: string; children?: React.ReactNode }) => {
  return (
    <div className={`flex h-1 items-center justify-center my-6 ${className}`}>
      <span className={`opacity-25 mx-4 h-0.5 bg-background shrink-0`} />
    </div>
  );
};
