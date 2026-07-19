import { ReactNode } from 'react';

declare module 'next-themes' {
  interface ThemeProviderProps {
    attribute?: 'class' | 'data-theme';
    defaultTheme?: string;
    enableSystem?: boolean;
    disableTransitionOnChange?: boolean;
    storageKey?: string;
    value?: string;
  }
  export const ThemeProvider: React.FC<ThemeProviderProps & { children: ReactNode }>;
}
