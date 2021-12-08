import React from 'react';

function EventsItem({ title, content, date }) {
  return (
    <article className='events__element'>
      <h1>{ title }</h1>
      <p>{ content }</p>
      <span>{ date }</span>
    </article>
  );
}

export default EventsItem;