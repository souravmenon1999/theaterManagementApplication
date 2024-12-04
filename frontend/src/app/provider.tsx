'use client';

import { ClientContextProvider } from './contextProvider';
import { ReactNode } from 'react';

// Define the props type for the Providers component
interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps): JSX.Element {
  return (
    <ClientContextProvider>{children}</ClientContextProvider>
  );
}
