import React from 'react';
import { Link } from 'react-router-dom';
import './AdminMenu.css';

function AdminMenu() {
  return (
    <ul className='navAdmin'>
      <li><Link to='/admin/signin/users'>Пользователи</Link></li>
      <li><Link to='/admin/signin/news'>Новости</Link></li>
      <li><Link to='/admin/signin/events'>События</Link></li>
      <li><Link to='/admin/signin/category'>Категории</Link></li>
      <li><Link to='/admin/signin/subcategory'>Подкатегории</Link></li>
      <li><Link to='/admin/signin/people'>Люди</Link></li>
    </ul>
  );
};

export default AdminMenu;