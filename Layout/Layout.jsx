import React from 'react'
import { Outlet } from 'react-router'
import { useDispatch } from 'react-redux'
import Header from '../src/Component/Header';
import Footer from '../src/Component/Footer';


function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}


export default Layout
