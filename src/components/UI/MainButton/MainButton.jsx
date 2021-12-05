import React from 'react';
import './MainButton.css';
import { Link } from "react-router-dom";


function MainButton( props ) {
  return (
    <li className='main__button'>
      <Link to={ props.link }>{ props.children }</Link>
    </li>
  );
};

export default MainButton;