import React from 'react';
import { Link } from 'react-router-dom';

function AdminMenu() {
  return (
    <ul className='navAdmin'>
      <li><Link to='/admin/signin/users'>Пользователи</Link></li>
      <li><Link to='/admin/signin/news'>Новости</Link></li>
    </ul>
  );
};

export default AdminMenu;