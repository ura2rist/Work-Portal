import React, { useEffect } from 'react';
import fetchApi from '../API/fetchApi';

function Signin() {
  function auth(e) {
    e.preventDefault();
    let login = e.target.login.value;
    let password = e.target.password.value;

    if(login.length > 0 && password.length > 0) {
      fetchApi.authSignIn(login, password)
        .then((response) => {
          console.log(response)
        })
    }
  }

  return (
    <div>
      <form onSubmit={ (e) => auth(e) }>
        <input type="text" name="login" />
        <input type="password" name="password" />
        <input type="submit" value="Войти" />
      </form>
    </div>
  );
}

export default Signin;