import { type PropsWithChildren } from 'react';
import { ErrorBoundary } from 'shared/ui/ErrorBoundary';
import { Fallback } from 'shared/ui/Fallback';

export const ErrorProvider = ({ children }: PropsWithChildren) => {
  return <ErrorBoundary fallback={<Fallback />}>{children}</ErrorBoundary>;
};
