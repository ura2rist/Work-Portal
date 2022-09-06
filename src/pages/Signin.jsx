import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../index';

function Signin() {
  const [ login, setLogin ] = useState('');
  const [ password, setPassword ] = useState('');
  const { store } = useContext(Context);

  return (
    <div>
        <input type="text" name="login" onChange={ e => setLogin(e.target.value) } value={ login } />
        <input type="password" name="password" onChange={ e => setPassword(e.target.value) } value={ password } />
        <button onClick = { () => store.login(login, password) }>Войти</button>
    </div>
  );
}

export default Signin;