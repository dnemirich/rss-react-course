import { AboutPage } from 'pages/About/AboutPage';
import { HomePage } from 'pages/Home/HomePage.tsx';
import { NotFoundPage } from 'pages/NotFound/NotFoundPage.tsx';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from 'shared/constants/routes.ts';

import { MainLayout } from './layouts/MainLayout/MainLayout.tsx';

const App = () => {
  return (
    <MainLayout>
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<AboutPage />} path={ROUTES.ABOUT} />
        <Route element={<NotFoundPage />} path={'*'} />
      </Routes>
    </MainLayout>
  );
};

export default App;
