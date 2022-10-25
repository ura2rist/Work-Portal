import React, { useContext } from 'react';
import { Context } from '../index'

function PeopleEditElement({ data, getPeople, selectCat, subCategory, employe, setModalActive, getInfo }) {
  const { store } = useContext(Context);

  async function removePeople() {
    await store.removePeople(data.id, employe);

    await getPeople(subCategory)
  }

  async function viewModal() {
    await getInfo(employe);

    await setModalActive(true);
  }

  return (
    <li>{ data.name } - { data.rank } : { data.pos }<button onClick={ viewModal }>Редактировать</button><button onClick={ () => removePeople() }>Удалить</button></li>
  );
}

export default PeopleEditElement;