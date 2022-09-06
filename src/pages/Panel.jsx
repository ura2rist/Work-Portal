import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import AdminMenu from '../components/AdminMenu';
import { Context } from "../index";

function Panel() {
  const { store } = useContext(Context);

  return (
    <div>
      <button onClick={ () => store.logout() }>Выйти</button>
      <div>
        <AdminMenu />
        <Outlet />
      </div>
    </div>
  );
}

export default Panel;