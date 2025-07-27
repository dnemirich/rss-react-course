import type { ReactNode } from 'react';

import * as React from 'react';

type Props = {
  children: ReactNode;
};

export const MainLayout: React.FC<Props> = ({ children }) => {
  return <div className={'flex flex-col items-center gap-10'}>{children}</div>;
};
