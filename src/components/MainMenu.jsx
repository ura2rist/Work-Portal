import React, { useState, useEffect } from 'react';
import MainButton from './UI/MainButton/MainButton';
import fetchApi from '../API/fetchApi';
import './MainMenu.css';

function MainMenu() {
  const [ menu, setMenu ] = useState([]);

  useEffect(()=> {
    fetchApi.getMenuItems()
      .then(setMenu)
  }, [])

  return (
    <ul className="menu">
      { 
        menu.map(men => 
          <MainButton key={ men.id } link={ men.link }>{ men.title }</MainButton>
        )
      }
    </ul>
  );
};

export default MainMenu;