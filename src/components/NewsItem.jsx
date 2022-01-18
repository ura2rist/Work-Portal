import React from 'react';
import { useNavigate } from 'react-router-dom';

function NewsItem({ title, content, author, date, id }) {
  const router = useNavigate();

  return (
    <article className='news__element'>
      <h1>{ title }</h1>
      <main>
        <div>
          { content }...
        </div>
        <div>
          <p><span>{ author }</span> <span>{ date }</span></p>
        </div>
        <div>
          <span className='news__full' onClick={ () => router(`/news/${id}`) }>Читать далее...</span>
        </div>
      </main>
    </article>
  );
}

export default NewsItem;