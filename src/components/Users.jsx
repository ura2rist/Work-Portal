import React, { useState, useContext } from 'react';
import { Context } from '../index';
import Modal from './modal/Modal';
import './Users.css';

function Users() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [modalActive, setModalActive] = useState(false);
  const [editUser, setEditUser] = useState();
  const [newPassword, setNewPassword] = useState('');
  const [newLogin, setNewLogin] = useState('');
  const [newFio, setNewFio] = useState('');
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
    <div className='addUser'>
      <div className='addUser__new'>
        <input className='addUser__input' value={user} onChange={(e) => setUser(e.target.value)} placeholder='Логин' type='text' />
        <input className='addUser__input' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Пароль' type='password' />
        <button className='addUser__button' onClick={() => store.addUser(user, password)}>Добавить</button>
      </div>
      <div className='addUser__search'>
        <input className='addUser__input' onChange={(e) => searchUser(e.target.value)} placeholder='поиск' name='name' />
        <button className='addUser__button' onClick={() => getUsers()}>Показать всех пользователей</button>
      </div>
      <ul>
        {users.length > 0 &&
          users.map((item) => (
            <li key={item.id} className='addUser__user'>
              {item.login}{' '}
              <button className='addUser__button-edit' data-iditem={item.id} data-login={item.login} onClick={(event) => callModal(event)}>
                Редактировать
              </button>
            </li>
          ))}
      </ul>
      <Modal active={modalActive} setActive={setModalActive}>
        <input
          className='modal__input'
          placeholder='Новый логин'
          type='text'
          name='login'
          value={newLogin}
          onChange={(event) => setNewLogin(event.target.value)}
        />
        <input
          className='modal__input'
          placeholder='Новый пароль'
          type='password'
          name='password'
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
        />
        <input
          className='modal__input'
          placeholder='ФИО которое привязать'
          type='text'
          name='fio'
          value={newFio}
          onChange={(event) => setNewFio(event.target.value)}
        />
        <button className='modal__button' onClick={() => removeUser(editUser)}>Удалить</button>
        <button className='modal__button' onClick={() => changeUser(editUser, { newLogin, newPassword, newFio })}>Изменить</button>
      </Modal>
    </div>
  );
}

export default Users;
