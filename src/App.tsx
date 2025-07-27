import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout/Layout.tsx';
import { ROUTES } from './constants/routes.ts';
import { AboutPage } from './pages/About/AboutPage.tsx';
import { HomePage } from './pages/Home/HomePage.tsx';
import { NotFoundPage } from './pages/NotFound/NotFoundPage.tsx';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route element={<HomePage />} index />
        <Route element={<HomePage />} path=":page" />
        <Route element={<HomePage />} path=":page/:detailsId" />
        <Route element={<AboutPage />} path={ROUTES.ABOUT} />
        <Route element={<NotFoundPage />} path={'*'} />
      </Routes>
    </Layout>
  );
};

export default App;
