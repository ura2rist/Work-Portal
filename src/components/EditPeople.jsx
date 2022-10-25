import React, { useState, useEffect, useContext } from 'react';
import fetchApi from '../API/fetchApi';
import Modal from './modal/Modal';
import { Context } from '../index';
import PeopleEditElement from './PeopleEditElement';

function EditPeople() {
  const { store } = useContext(Context);
  const [ category, setCategory ] = useState([]);
  const [ subCategory, setSubCategory ] = useState([]);
  const [ selectCat, setSelectCat ] = useState(0);
  const [ selectSubCat, setSelectSubCat ] = useState(0);
  const [ text, setText ] = useState('');
  const [ people, setPeople ] = useState([]);
  const [ modalActive, setModalActive ] = useState(false);
  const [ fio, setFio ] = useState('');
  const [ rank, setRank ] = useState('');
  const [ phone, setPhone ] = useState('');
  const [ mainPhone, setMainPhone ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ position, setPosition ] = useState(0);
  const [ employe, setEmploye ] = useState(0);

  useEffect(() => {
    allCategory();
  }, []);

  function allCategory() {
    fetchApi.getAllCategory().then((response) => {
      setCategory(response);
    })
  }

  async function getSubCategory(id) {
    setSelectCat(id);

    fetchApi.getSubCategory(id).then((response) => {
      setSubCategory(response);
    });
  }

  function addPeople() {
    const response = store.addPeople(selectCat, selectSubCat, text);

    response.then((item) => {
      setText('');

      getPeople(selectSubCat);
    })
  }

  function getPeople(event){
    setSelectSubCat(event);

    fetchApi.getDirectory(selectCat, event)
      .then((response) => {
        if(response) {
          setPeople(response[0].subCategory[0].data);
        }
      })
  }

  function getInfo(id) {
    const response = store.getInfo(id);

    response.then((item) => {
      setFio(item.data.fio.name);
      setRank(item.data.rank.name);
      setPhone(item.data.phone.name);
      setMainPhone(item.data.mainPhone.name);
      setDescription(item.data.description);
      setPosition(item.data.position);
      setEmploye(item.data.employe);
    })
  }

  function editPeople() {
    const info = {
      fio: fio,
      rank: rank,
      phone: phone,
      mainPhone: mainPhone,
      description: description,
      position: position,
      employe: employe
    };

    const response = store.editPeople(info);

    response.then((item) => {
      getPeople(selectSubCat);

      setModalActive(false);
    });
  }

  return (
    <div>
      <select onChange={ (event) => getSubCategory(event.currentTarget.value) } defaultValue={ 'default' }>
        <option disabled value='default'>Категория</option>
        {category.map((item) => (
          <option key={ item.id } value={ item.id }>{ item.category }</option>
        ))}
      </select>
      {subCategory.length > 0 && (
        <select onChange={ (event) => getPeople(event.currentTarget.value) } defaultValue={ 'default' }>
          <option disabled value='default'>Подкатегория</option>
          {subCategory.map((item) => (
            <option key={ item.id } value={ item.id }>{ item.subCategory }</option>
          ))}
        </select>
      )}
      {subCategory.length > 0 && (
        <div>
          <div>
            <p>Формат ввода: ФИО:Должность:Внешний телефон:Внутренний телефон:Описание;</p>
            <textarea name="" id="" cols="30" rows="10" value={ text } onChange={ (event) => setText(event.currentTarget.value) } />
            <button onClick={ () => addPeople() }>Добавить</button>
          </div>
          <div>
            <ul>
              {people.map((item) => (
                  <PeopleEditElement key={ item.id } getInfo={ getInfo } setModalActive={ setModalActive } employe={ item.employe } data={ item } getPeople={ getPeople } category={ selectCat } subCategory={ selectSubCat }/>
              ))}
            </ul>
          </div>
          <Modal active={modalActive} setActive={setModalActive}>
            <input
              placeholder='ФИО'
              type='text'
              name='fio'
              value={fio}
              onChange={(event) => setFio(event.target.value)}
            />
            <input
              placeholder='Должность'
              type='text'
              name='rank'
              value={rank}
              onChange={(event) => setRank(event.target.value)}
            />
            <input
              placeholder='Внешний телефон'
              type='text'
              name='phone'
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
            <input
              placeholder='Внутренний телефон'
              type='text'
              name='mainPhone'
              value={mainPhone}
              onChange={(event) => setMainPhone(event.target.value)}
            />
            <input
              placeholder='Описание'
              type='text'
              name='description'
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <input
              placeholder='Позиция'
              type='number'
              name='position'
              value={position}
              onChange={(event) => setPosition(event.target.value)}
            />
            <button onClick={() => editPeople()}>Сохранить</button>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default EditPeople;