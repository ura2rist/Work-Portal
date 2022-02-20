import React, { useState, useEffect } from 'react';
import Panel from './Panel';
import Signin from './Signin';
import fetchApi from '../API/fetchApi';

function Admin() {
  let [adminStatus, setAdminStatus] = useState(false);

  useEffect(() => {
    fetchApi.authCheck()
      .then((response) => {
        console.log(response)
      })
  }, []);

  return (
    <section>
      { !adminStatus ? <Signin setAdminStatus={ setAdminStatus } /> : <Panel setAdminStatus={ setAdminStatus } /> }
    </section>
  )
}

export default Admin;