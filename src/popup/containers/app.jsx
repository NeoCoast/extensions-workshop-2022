import React from 'react';
import { SWRConfig } from 'swr';
import {
  MemoryRouter,
  Routes,
  Route,
} from 'react-router-dom';

import fetcher from '../swr/fetcher';
import Layout from '../components/layout';
import Home from './home';
import Login from './login';

const App = () => (
  <SWRConfig value={{ fetcher }}>
    <Layout>
      <MemoryRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </Layout>
  </SWRConfig>
);

export default App;
