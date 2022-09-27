import React, { useState, useContext } from 'react';
import { Context } from '../index';
import Modal from './modal/Modal';

function Users() {
  let [user, setUser] = useState('');
  let [password, setPassword] = useState('');
  let [users, setUsers] = useState([]);
  let [modalActive, setModalActive] = useState(false);
  let [editUser, setEditUser] = useState();
  let [newPassword, setNewPassword] = useState('');
  let [newLogin, setNewLogin] = useState('');
  let [newFio, setNewFio] = useState('');
  const { store } = useContext(Context);

  function getUsers() {
    const response = store.getUsers();

    response.then((item) => setUsers(item.data));
  }

  function changeUser(id, data) {
    const response = store.changeUser(id, data);

    response.then(() => {
      setModalActive(false);

      setNewPassword('');
      setNewFio('');
      setNewLogin('');
    });
  }

  function removeUser(id) {
    const response = store.removeUser(id);

    response.then((item) => {
      setUsers(users.filter((item) => item.id != id));

      setModalActive(false);
    });
  }

  function callModal(event) {
    setModalActive(true);

    setEditUser(event.target.dataset.iditem);
  }

  function searchUser(name) {
    const response = store.searchUser(name);

    response.then((item) => setUsers(item.data));
  }

  return (
    <div>
      <div>
        <input value={user} onChange={(e) => setUser(e.target.value)} placeholder='Логин' type='text' />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Пароль' type='password' />
        <button onClick={() => store.addUser(user, password)}>Добавить</button>
      </div>
      <div>
        <input onChange={(e) => searchUser(e.target.value)} placeholder='поиск' name='name' />
        <button onClick={() => getUsers()}>Показать всех пользователей</button>
      </div>
      <ul>
        {users.length > 0 &&
          users.map((item) => (
            <li key={item.id}>
              {item.login}{' '}
              <button data-iditem={item.id} data-login={item.login} onClick={(event) => callModal(event)}>
                Редактировать
              </button>
            </li>
          ))}
      </ul>
      <Modal active={modalActive} setActive={setModalActive}>
        <input
          placeholder='Новый логин'
          type='text'
          name='login'
          value={newLogin}
          onChange={(event) => setNewLogin(event.target.value)}
        />
        <input
          placeholder='Новый пароль'
          type='password'
          name='password'
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
        />
        <input
          placeholder='ФИО которое привязать'
          type='text'
          name='fio'
          value={newFio}
          onChange={(event) => setNewFio(event.target.value)}
        />
        <button onClick={() => removeUser(editUser)}>Удалить</button>
        <button onClick={() => changeUser(editUser, { newLogin, newPassword, newFio })}>Изменить</button>
      </Modal>
    </div>
  );
}

export default Users;
