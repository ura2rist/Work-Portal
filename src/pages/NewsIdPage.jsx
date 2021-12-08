import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import fetchApi from '../API/fetchApi';

function NewsIdPage() {
  const params = useParams();
  const [ newsItem, setNewsItem ] = useState(null);

  useEffect(() => {
    fetchApi.getByIdNews(params.id)
      .then(setNewsItem)
  }, [params.id]);
  
  return (
    <div>
      <h1>{ newsItem?.title }</h1>
      <div>
        { newsItem?.content }   
      </div>
      <div>
        <p><span>Автор: </span>{ newsItem?.user?.login }</p>
        <p><span>Дата публикации: </span>{ newsItem?.date }</p>
      </div>
    </div>
  );
}

export default NewsIdPage;