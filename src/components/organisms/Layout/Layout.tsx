import React from 'react';
import { Header } from '../Header/Header.tsx';

export const Layout = ({ children }: ILayout) => {
  return (
    <>
      <Header />
      <div className="bg-gray-100 h-auto min-h-screen">
        <div className="max-w-7xl mx-auto py-6 sm:p-6 lg:px-8">
          <div className="w-full mx-auto bg-white rounded-md">{children}</div>
        </div>
      </div>
    </>
  );
};

interface ILayout {
  children: JSX.Element;
}
