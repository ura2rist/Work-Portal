import React, { useState, useContext, useEffect } from 'react';
import Modal from './modal/Modal';
import { Context } from '../index';
import fetchApi from '../API/fetchApi';
import CategoryItemEdit from './CategoryItemEdit';

function EditCategory() {
  const [modalActive, setModalActive] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState([]);
  const { store } = useContext(Context);

  useEffect(() => {
    allCategory();
  }, []);

  function allCategory() {
    fetchApi.getAllCategory().then((response) => {
      setCategory(response);
    });
  }

  function addCategoryModal() {
    setModalActive(true);
  }

  function addCategory(name) {
    if(!name) return;

    const response = store.addCategory(name);

    response.then((item)=> {
      allCategory();

      setModalActive(false);

      setName('');
    })
  }

  return (
    <div>
      <button className='panel-add' onClick={ () => addCategoryModal() }>Добавить категорию</button>
      <div>
        {category.map((item) => (
          <CategoryItemEdit 
            key={ item.id } 
            id={ item.id } 
            name={ item.category } 
            position={ item.position }
            allCategory={ allCategory }
          />
        ))}
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
          <input
            className='modal__input'
            placeholder='Заголовок'
            type='text'
            name='title'
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <button className='modal__button' onClick={() => addCategory(name)}>Сохранить</button>
        </Modal>
    </div>
  );
}

export default EditCategory;