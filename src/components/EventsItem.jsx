import React from 'react';
import './EventsItem.css';

function EventsItem({ title, content, date }) {
  return (
    <article className='events__element'>
      <h1 className='events__title'>{ title }</h1>
      <p className='events__content'>{ content }</p>
      <span className='events__date'>{ date }</span>
    </article>
  );
}

export default EventsItem;