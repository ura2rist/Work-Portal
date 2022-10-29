import React, { useEffect, useState, useContext } from 'react';
import { useParams } from "react-router-dom";
import fetchApi from '../API/fetchApi';
import { Context } from '../index';

function NewsIdPageEdit() {
  const params = useParams();
  const [ newsItem, setNewsItem ] = useState(null);
  const [ title, setTitle ] = useState('');
  const [ content, setContent ] = useState(''); 
  const [ author, setAuthor ] = useState('');
  const [ users, setUsers ] = useState([]);
  const { store } = useContext(Context);
  const [ status, setStatus ] = useState(false);

  function getUsers() {
    const response = store.getUsers();

    response.then(item => setUsers(item.data));
  }

  function saveEvent() {
    const response  = store.saveEvent({ id: params.id, title, content, author });

    response.then(item => setStatus(item));
  }

  useEffect(() => {
    fetchApi.getByIdEvent(params.id)
      .then((response) => {
        setNewsItem(response);
        setTitle(response.title);
        setContent(response.content);
        setAuthor(response.user ? response.user.login : '' );
      })
      .then(getUsers());
  }, [params.id]);
  
  return (
    <div className='wrapper'>
      <input className='editNews__title' type="text" value={ title } onChange={(event) => setTitle(event.target.value)}/>
      <div>
        <textarea className='editNews__content' value={ content } onChange={(event) => setContent(event.target.value)}></textarea>
      </div>
      <div>
        <p><span>Дата публикации: </span>{ newsItem?.date }</p>
      </div>
      <button className='editNews__save' onClick={ () => saveEvent() }>Сохранить</button>
      { status && <h2>Сохранено</h2> }
    </div>
  );
}

export default NewsIdPageEdit;