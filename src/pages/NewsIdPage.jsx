import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import fetchApi from '../API/fetchApi';
import './NewsIdPage.css';

function NewsIdPage() {
  const params = useParams();
  const [ newsItem, setNewsItem ] = useState(null);

  useEffect(() => {
    fetchApi.getByIdNews(params.id)
      .then(setNewsItem)
  }, [params.id]);
  
  return (
    <div className='newsPage'>
      <div className='wrapper'>
        <h1 className='newsPage__title'>{ newsItem?.title }</h1>
        <div className='newsPage__content'>
          { newsItem?.content }   
        </div>
        <div className='newsPage__info'>
          <p><span>Автор: </span>{ newsItem?.user?.login }</p>
          <p><span>Дата публикации: </span>{ newsItem?.date }</p>
        </div>
      </div>
    </div>
  );
}

export default NewsIdPage;