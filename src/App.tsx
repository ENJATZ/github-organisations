import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { client as apolloClient } from './ApolloClient/client.ts';
import { HomePage } from './components/pages/HomePage.tsx';
import { OrganisationPage } from './components/pages/OrganisationPage.tsx';
import { AppContextProvider } from './components/organisms/AppContextProvider/AppContextProvider.tsx';
import { Layout } from './components/organisms/Layout/Layout.tsx';

export const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <AppContextProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <HomePage />
                </Layout>
              }
            />
            <Route
              path="/organization/:login"
              element={
                <Layout>
                  <OrganisationPage />
                </Layout>
              }
            />
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </ApolloProvider>
  );
};

export default App;
