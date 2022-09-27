import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../index';

function NewsItem({ allNews, title, content, author, date, id }) {
  const router = useNavigate();
  const { store } = useContext(Context);

  async function removeNews() {
    await store.removeNews(id);
    await allNews();
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
          <span className='news__full' onClick={() => router(`/admin/signin/newsEdit/${id}`)}>
            Редактировать
          </span>
          <br></br>
          <span className='news__full' onClick={() => removeNews()}>
            Удалить
          </span>
        </div>
      </main>
    </article>
  );
}

export default NewsItem;
