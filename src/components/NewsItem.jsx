import React from 'react';
import { Link } from 'react-router-dom';

function NewsItem({ title, content, author, date }) {
  return (
    <article className='news__element'>
      <h1>{ title }</h1>
      <main>
        <div>
          { content }...
        </div>
        <div>
          <span>{ author }</span>
          <span>{ date }</span>
        </div>
        <div>
        <Link to='/post'>Читать далее...</Link>
        </div>
      </main>
    </article>
  );
}

export default NewsItem;