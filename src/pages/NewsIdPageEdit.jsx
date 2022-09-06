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

  function saveNews() {
    const response  = store.saveNews({ id: params.id, title, content, author });

    response.then(item => setStatus(item));
  }

  useEffect(() => {
    fetchApi.getByIdNews(params.id)
      .then((response) => {
        setNewsItem(response);
        setTitle(response.title);
        setContent(response.content);
        setAuthor(response.user ? response.user.login : '' );
      })
      .then(getUsers());
  }, [params.id]);
  
  return (
    <div>
      <input type="text" value={ title } onChange={(event) => setTitle(event.target.value)}/>
      <div>
        <textarea value={ content } onChange={(event) => setContent(event.target.value)}></textarea>
      </div>
      <div>
        <p>
          <span>Автор: </span>
          <select value={ author } onChange={ (event) => setAuthor(event.currentTarget.value) }>
              <option value=''>Ничего</option>
            { users.map((item) =>
              <option 
                key={ item.id } 
                value={ item.login }
                >
                { item.login }
              </option>
            ) }
          </select>
        </p>
        <p><span>Дата публикации: </span>{ newsItem?.date }</p>
      </div>
      <button onClick={ () => saveNews() }>Сохранить</button>
      { status && <h2>Сохранено</h2> }
    </div>
  );
}

export default NewsIdPageEdit;