import { AboutPage } from 'pages/About/AboutPage';
import { HomePage } from 'pages/Home/HomePage.tsx';
import { NotFoundPage } from 'pages/NotFound/NotFoundPage.tsx';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from 'shared/constants/routes.ts';
import { Details } from 'widgets/Details/Details.tsx';

import Layout from './layouts/MainLayout/Layout.tsx';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route element={<HomePage />} path="/">
          <Route element={null} index />
          <Route element={null} path=":page" />
          <Route element={<Details />} path=":page/:detailsId" />
        </Route>
        <Route element={<AboutPage />} path={ROUTES.ABOUT} />
        <Route element={<NotFoundPage />} path={'*'} />
      </Routes>
    </Layout>
  );
};

export default App;
