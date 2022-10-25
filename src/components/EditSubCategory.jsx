import React, { useState, useContext, useEffect } from 'react';
import fetchApi from '../API/fetchApi';
import Modal from './modal/Modal';
import { Context } from '../index';

function EditSubCategory() {
  const { store } = useContext(Context);
  const [category, setCategory] = useState([]);
  const [newSubCat, setSubCat] = useState('');
  const [modalActive, setModalActive] = useState(false);
  const [modalActiveEdit, setModalActiveEdit] = useState(false);
  const [categoryId, setCategoryId] = useState(0);
  const [titleCat, setTitleCat] = useState('');
  const [positionCat, setPositionCat] = useState('');
  const [subCategoryId, setSubCategoryId] = useState(0);

  useEffect(() => {
    allSubCategory();
  }, []);

  function callModal() {
    setModalActive(true);
  }

  function callModalEdit(id, title, position, catId) {
    setTitleCat(title);
    setPositionCat(position);
    setSubCategoryId(id);
    setCategoryId(catId);

    setModalActiveEdit(true);
  }

  async function addSubCategory() {
    if(!newSubCat) return;

    await store.addSubCategory(categoryId, newSubCat);

    allSubCategory();

    setSubCat('');
    setModalActive(false);
  }

  function allSubCategory() {
    fetchApi.getAllCategory()
      .then((response) => {
        setCategory(response);
      })
  }

  async function removeSubCategory(catId, subCatid){
    await store.removeSubCategory(catId, subCatid);

    allSubCategory();
  }

  async function changeSubCategory() {
    await store.changeSubCategory(subCategoryId, titleCat, positionCat, categoryId);

    allSubCategory();
    setModalActiveEdit();
  }

  return (
    <div>
      <ul className='directory__menu'>
      { 
        category.map(item =>
          item.subCategories ? 
            <li key={ item.id }>
              { item.category }<button onClick={ () => {
                callModal();
                setCategoryId(item.id);
              } }>Добавить подкатегорию</button>
              <ul>
                {
                  item.subCategories.map((sub) => <li key={ sub.id }>{ sub.category } : { sub.position }<button onClick={ () => callModalEdit(sub.id, sub.category, sub.position, item.id ) }>Редактировать</button><button onClick={ () => removeSubCategory(item.id, sub.id) }>Удалить</button></li>)
                }
              </ul>
            </li>
            : <li key={ item.id } className='directory__element'>{ item.category }</li>
        )
      }
      </ul>
      <Modal active={modalActive} setActive={setModalActive}>
        <input
          placeholder='Подкатегория'
          type='text'
          name='subcat'
          value={newSubCat}
          onChange={(event) => setSubCat(event.target.value)}
        />
        <button onClick={() => addSubCategory()}>Добавить</button>
      </Modal>
      <Modal active={modalActiveEdit} setActive={setModalActiveEdit}>
      <input
          placeholder='Новый заголовок'
          type='text'
          name='title'
          value={titleCat}
          onChange={(event) => setTitleCat(event.target.value)}
        />
        <input
          placeholder='Позиция'
          type='text'
          name='position'
          value={positionCat}
          onChange={(event) => setPositionCat(event.target.value)}
        />
        <button onClick={() => changeSubCategory()}>Изменить</button>
      </Modal>
    </div>
  );
}

export default EditSubCategory;