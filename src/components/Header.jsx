import React from 'react';
import MainMenu from './MainMenu';
import MainButton from './UI/MainButton/MainButton';
import './Header.css';

function Header() {
  return (
    <header className='header'>
      <div className='wrapper'>
        <nav>
          <MainMenu />
        </nav>
        <ul className='account-menu'>
          <MainButton link="/admin/signin">ЛК</MainButton>
        </ul>
      </div>
    </header>
  );
}

export default Header;