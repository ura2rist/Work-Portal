import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import AdminMenu from '../components/AdminMenu';
import { Context } from "../index";
import './Panel.css';

function Panel() {
  const { store } = useContext(Context);

  return (
    <div className='wrapper'>
      <button className='signout' onClick={ () => store.logout() }>Выйти</button>
      <AdminMenu />
      <Outlet />
    </div>
  );
}

export default Panel;