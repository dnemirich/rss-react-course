import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';
import { ROUTES } from 'shared/constants/routes.ts';

export const NotFoundPage = () => {
  return (
    <div
      className={'flex flex-col items-center justify-center gap-3.5 h-screen'}
    >
      <h1 className={'text-9xl text-stone-500 font-bold'}>404</h1>
      <p className={'text-3xl'}>Oops, this page doesn&#39;t exist</p>
      <NavLink
        className={'flex gap-2 justify-center items-center'}
        to={ROUTES.HOME}
      >
        <ArrowLeftIcon height={16} width={16} />
        <span className={'hover:text-lime-600 transition-colors'}>
          Back to the main page
        </span>
      </NavLink>
    </div>
  );
};
