import type { Metadata } from 'next';

import { ProviderComposer } from 'providers/ProviderComposer.tsx';

import './globals.css';
import * as React from 'react';
import { StrictMode } from 'react';

export const metadata: Metadata = {
  title: 'Art gallery',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <StrictMode>
          <ProviderComposer>
            <div id="root">
              <div className={'flex flex-col items-center gap-10'}>
                {children}
              </div>
            </div>
          </ProviderComposer>
        </StrictMode>
      </body>
    </html>
  );
}
