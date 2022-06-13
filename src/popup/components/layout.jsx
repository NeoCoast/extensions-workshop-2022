import React from 'react';
import pt from 'prop-types';

const Layout = ({ children }) => (
  <main className="flex flex-1 flex-col items-center justify-center w-full h-full p-4">
    {children}
  </main>
);

Layout.propTypes = {
  children: pt.node.isRequired,
};

export default Layout;
