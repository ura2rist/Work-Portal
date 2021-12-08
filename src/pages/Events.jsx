import React, { useEffect, useState } from 'react';
import fetchApi from '../API/fetchApi';
import EventsItem from '../components/EventsItem';
import { getPagesArray, getPagesCount } from '../utils/pages';

function Events() {
  const [ events, setEvents ] = useState([]);
  const [ totalPages, setTotalPages ] = useState(0);
  const [ page, setPage ] = useState(1);
  const pageArray = getPagesArray(totalPages);

  useEffect(() => {
    fetchApi.getEventsItems(8, page)
      .then((response) => {
        const [ resCount, resData ] = response.data;
        setEvents(resData);
        setTotalPages(getPagesCount(resCount, 8));
      })
  }, [ page ])

  function changePage(page) {
    setPage(page);
  }

  return (
    <section className='events'>
      <div className='events__list'>
        {
          events.map(item => 
            <EventsItem title={ item.title } key={ item.id } content={ item.content } date={ item.date }/>
          )
        }
      </div>
      <ul className='pagination'>
        {
          pageArray.map(p =>
            <li onClick={ () => changePage(p) } key={ p } className={ p === page ? 'pagination__element_active pagination__element' : 'pagination__element' }>{ p }</li>
          )
        }
      </ul>
    </section>
  );
};

export default Events;