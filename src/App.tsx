import { Route, Routes } from 'react-router-dom';

import { Details } from './components/Details/Details.tsx';
import Layout from './components/Layout/Layout.tsx';
import { ROUTES } from './constants/routes.ts';
import { AboutPage } from './pages/About/AboutPage.tsx';
import { HomePage } from './pages/Home/HomePage.tsx';
import { NotFoundPage } from './pages/NotFound/NotFoundPage.tsx';

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
