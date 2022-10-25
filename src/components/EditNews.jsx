import React, { useEffect, useState, useContext } from 'react';
import NewsItemEdit from '../components/NewsItemEdit';
import fetchApi from '../API/fetchApi';
import Modal from './modal/Modal';
import { Context } from '../index';
import { getPagesCount, getPagesArray } from '../utils/pages';

function EditNews() {
  const { store } = useContext(Context);
  const [news, setNews] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [modalActive, setModalActive] = useState(false);
  let pageArray = getPagesArray(totalPages);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  useEffect(() => {
    allNews();
  }, [page]);

  function allNews() {
    fetchApi.getNewsItems(10, page).then((response) => {
      const [resCount, resData] = response.data;
      setNews(resData);
      setTotalPages(getPagesCount(resCount));
    });
  }

  function addNewsPost(title, content) {
    const response = store.addNewsPost(title, content, localStorage.getItem('id'));

    response.then((item)=> {
      allNews();

      setModalActive(false);

      setNewTitle('');
      setNewContent('');
    })
  }

  function changePage(page) {
    setPage(page);
  }

  function addNews(event) {
    setModalActive(true);
  }

  return (
    <div>
      <button onClick={(event) => addNews(event)}>Добавить новость</button>
      <div>
        {news.map((item) => (
          <NewsItemEdit
            allNews={allNews}
            title={item.title}
            key={item.id}
            id={item.id}
            content={item.content}
            date={item.date}
            author={item['user.login']}
            idAuthor={item.userId}
          />
        ))}
      </div>
      <ul className='pagination'>
        {pageArray.map((p) => (
          <li
            onClick={() => changePage(p)}
            key={p}
            className={p === page ? 'pagination__element_active pagination__element' : 'pagination__element'}
          >
            {p}
          </li>
        ))}
      </ul>
      <Modal active={modalActive} setActive={setModalActive}>
        <input
          placeholder='Заголовок'
          type='text'
          name='title'
          value={newTitle}
          onChange={(event) => setNewTitle(event.target.value)}
        />
        <input
          placeholder='Контент'
          type='text'
          name='text'
          value={newContent}
          onChange={(event) => setNewContent(event.target.value)}
        />
        <button onClick={() => addNewsPost(newTitle, newContent)}>Сохранить</button>
      </Modal>
    </div>
  );
}

export default EditNews;
