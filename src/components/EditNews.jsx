import React, { useEffect, useState } from 'react';
import NewsItemEdit from '../components/NewsItemEdit';
import fetchApi from '../API/fetchApi';
import { getPagesCount, getPagesArray } from '../utils/pages'

function EditNews() {
  const [ news, setNews ] = useState([]);
  const [ totalPages, setTotalPages ] = useState(0);
  const [ page, setPage ] = useState(1);
  let pageArray = getPagesArray(totalPages);

  useEffect(()=>{
    fetchApi.getNewsItems(10, page)
      .then((response) => {
        const [ resCount, resData ] = response.data;
        setNews(resData);
        setTotalPages(getPagesCount(resCount));
      })
  }, [ page ])

  function changePage(page) {
    setPage(page);
  }

  return (
    <div>
      <div>
        {
          news.map(item => 
            <NewsItemEdit title={ item.title } key={ item.id } id={ item.id } content={ item.content } date={ item.date } author={ item['user.login'] } idAuthor={ item.userId } />
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
    </div>
  )
}

export default EditNews;