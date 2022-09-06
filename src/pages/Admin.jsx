import React, { useState, useEffect, useContext } from 'react';
import Panel from './Panel';
import Signin from './Signin';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import UserService from '../services/UserService';

function Admin() {
  const { store } = useContext(Context);

  return (
    <section>
      { !store.isAuth ? <Signin /> : <Panel /> }
    </section>
  )
}

export default observer(Admin);