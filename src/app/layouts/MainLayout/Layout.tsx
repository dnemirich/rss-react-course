import React, { type ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const MainLayout: React.FC<Props> = ({ children }) => {
  return <div className={'flex flex-col items-center gap-10'}>{children}</div>;
};

export default MainLayout;
