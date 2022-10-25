import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../index';

function EventsItem({ allEvents, title, content, author, date, id }) {
  const router = useNavigate();
  const { store } = useContext(Context);

  async function removeEvent() {
    await store.removeEvent(id);

    await allEvents();
  }

  return (
    <article className='news__element'>
      <h1>{title}</h1>
      <main>
        <div>{content}...</div>
        <div>
          <p>
            <span>{author}</span> <span>{date}</span>
          </p>
        </div>
        <div>
          <span className='news__full' onClick={() => router(`/admin/signin/eventEdit/${id}`)}>
            Редактировать
          </span>
          <br></br>
          <span className='news__full' onClick={() => removeEvent()}>
            Удалить
          </span>
        </div>
      </main>
    </article>
  );
}

export default EventsItem;
