import React from 'react';
import MainMenu from './MainMenu';
import MainButton from './UI/MainButton/MainButton';

function Header() {
  return (
    <header className='header'>
      <nav>
        <MainMenu />
      </nav>
      <ul className='account-menu'>
        <MainButton link="/admin/signin">Войти</MainButton>
      </ul>
    </header>
  );
}

export default Header;