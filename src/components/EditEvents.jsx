import React, { useEffect, useState, useContext } from 'react';
import EventsItemEdit from '../components/EventsItemEdit';
import fetchApi from '../API/fetchApi';
import Modal from './modal/Modal';
import { Context } from '../index';
import { getPagesCount, getPagesArray } from '../utils/pages';

function EditEvents() {
  const { store } = useContext(Context);
  const [news, setNews] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [modalActive, setModalActive] = useState(false);
  let pageArray = getPagesArray(totalPages);
  const [eventTitle, setEventsTitle] = useState('');
  const [eventContent, setEventsContent] = useState('');

  useEffect(() => {
    allEvents();
  }, [page]);

  function allEvents() {
    fetchApi.getEventsItems(10, page).then((response) => {
      const [resCount, resData] = response.data;
      setNews(resData);
      setTotalPages(getPagesCount(resCount));
    });
  }

  function addEventPost(title, content) {
    const response = store.addEventPost(title, content, localStorage.getItem('id'));

    response.then((item)=> {
      allEvents();

      setModalActive(false);

      setEventsTitle('');
      setEventsContent('');
    })
  }

  function changePage(page) {
    setPage(page);
  }

  function addEvents(event) {
    setModalActive(true);
  }

  return (
      <div>
        <button className='panel-add' onClick={(event) => addEvents(event)}>Добавить событие</button>
        <div>
          {news.map((item) => (
            <EventsItemEdit
              allEvents={allEvents}
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
            className='modal__input'
            placeholder='Заголовок'
            type='text'
            name='title'
            value={eventTitle}
            onChange={(event) => setEventsTitle(event.target.value)}
          />
          <input
            className='modal__input'
            placeholder='Контент'
            type='text'
            name='text'
            value={eventContent}
            onChange={(event) => setEventsContent(event.target.value)}
          />
          <button className='modal__button' onClick={() => addEventPost(eventTitle, eventContent)}>Сохранить</button>
        </Modal>
      </div>
    );
}

export default EditEvents;