import React, { useContext, useState } from 'react';
import { Context } from '../index';
import Modal from './modal/Modal';


function CategoryItemEdit({ name: title, position, id, allCategory }) {
  const { store } = useContext(Context);
  const [titleCat, setTitleCat] = useState(title);
  const [positionCat, setPositionCat] = useState(position);
  let [modalActive, setModalActive] = useState(false);

  async function removeCategory(){
    await store.removeCategory(id);

    await allCategory();
  }

  async function changeCategory(id, title, position) {
    await store.changeCategory(id, title, position);

    await allCategory();

    setModalActive(false);
  }

  function callModal() {
    setModalActive(true);
  }

  return (
    <article>
      <h1>{ title }</h1>
      <h5>Позиция: { position }</h5>
      <button onClick={ () => callModal() }>Редактировать</button>
      <button onClick={ () => removeCategory(id) }>Удалить</button>
      <Modal active={modalActive} setActive={setModalActive}>
        <input
          className='modal__input'
          placeholder='Новый заголовок'
          type='text'
          name='title'
          value={titleCat}
          onChange={(event) => setTitleCat(event.target.value)}
        />
        <input
          className='modal__input'
          placeholder='Позиция'
          type='text'
          name='position'
          value={positionCat}
          onChange={(event) => setPositionCat(event.target.value)}
        />
        <button className='modal__button' onClick={() => changeCategory(id, titleCat, positionCat)}>Изменить</button>
      </Modal>
    </article>
  )
}

export default CategoryItemEdit;