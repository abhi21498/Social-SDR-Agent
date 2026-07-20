import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TabsContextProps {
  value: string;
  setValue: (value: string) => void;
}

const TabsContext = createContext<TabsContextProps | null>(null);

interface TabsProps {
  children: ReactNode;
  defaultValue?: string;
  className?: string;
}

export const Tabs = ({ children, defaultValue, className }: TabsProps) => {
  const [value, setValue] = useState<string>(defaultValue ?? '');
  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={`${className} w-full`}>{children}</div>
    </TabsContext.Provider>
  );
};

export const TabsList = ({ className, children }: { className?: string; children: ReactNode }) => {
  return (
    <div className={`${className} flex flex-wrap items-center -mb-px`}>
      {children}
    </div>
  );
};

export const TabsTrigger = ({ 
  className, 
  children, 
  value,
  ...props 
}: { 
  className?: string; 
  children: ReactNode;
  value: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    throw new Error('TabsTrigger must be used within Tabs');
  }
  const isActive = ctx.value === value;
  
  const handleClick = () => {
    ctx.setValue(value);
  };
  
  const base = 'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-accent data-[state=active]:text=foreground data-[state=disabled]:pointer-events-none data-[state=disabled]:opacity-50';
  const active = 'bg-accent text-accent-foreground';
  
  return (
    <button
      onClick={handleClick}
      className={`${base} ${isActive ? active : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ className, children, value }: { className?: string; children: ReactNode; value: string }) => {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    throw new Error('TabsContent must be used within Tabs');
  }
  if (ctx.value !== value) {
    return null;
  }
  return (
    <div className={`${className} mt-2 block whitespace-nowrap rounded-md border bg-popover p-4 text-popover-foreground shadow-sm`}>
      {children}
    </div>
  );
};
