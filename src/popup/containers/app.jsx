import React from 'react';
import { SWRConfig } from 'swr';
import {
  MemoryRouter,
  Routes,
  Route,
} from 'react-router-dom';

import Home from './home';
import Layout from '../components/layout';
import Login from './login';
import Upload from './upload';

import ROUTES from '../data/routes';
import fetcher from '../swr/fetcher';

const App = () => (
  <SWRConfig value={{ fetcher }}>
    <Layout>
      <MemoryRouter>
        <Routes>
          <Route path={ROUTES.home}>
            <Route index element={<Home />} />
            <Route path={ROUTES.login} element={<Login />} />
            <Route path={ROUTES.upload} element={<Upload />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </Layout>
  </SWRConfig>
);

export default App;
