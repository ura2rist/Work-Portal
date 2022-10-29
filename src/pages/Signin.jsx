import React, { useContext, useState } from 'react';
import { Context } from '../index';
import './Signin.css';

function Signin() {
  const [ login, setLogin ] = useState('');
  const [ password, setPassword ] = useState('');
  const { store } = useContext(Context);

  return (
    <div className='signin'>
        <input className='signin__input' type="text" name="login" onChange={ e => setLogin(e.target.value) } value={ login } />
        <input className='signin__input' type="password" name="password" onChange={ e => setPassword(e.target.value) } value={ password } />
        <button className='signin__enter' onClick = { () => store.login(login, password) }>Войти</button>
    </div>
  );
}

export default Signin;