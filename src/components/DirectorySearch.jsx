import React from 'react';
import fetchApi from '../API/fetchApi';

function DirectorySearch({ setPeople, ...props }) {
  function search(e) {
    e.preventDefault();
    let search = e.target.search.value;
    let searchRange = e.target.searchRange.value;
    
    if(search.length === 0) {
      return;
    }

    let data = {
      allSearch: searchRange === 'all' ? true : false,
      data: search,
      category: props.select.category
    }

    fetchApi.getSearchForm(data)
      .then((response) => {
        setPeople(response);
      })
  }

  return (
    <form action="" className="directory__form" onSubmit={ (e) => search(e) }>
      <input type="text" placeholder="Поиск" name="search" className="directory__search"/>
      <input type='submit' className='directory__button' value='Поиск'/>
      <div style={{width: '80%'}}>
        <input type="radio" id="searchChoice1" name="searchRange" value="all" defaultChecked/>
        <label htmlFor="searchChoice1">Везде</label>
        <input type="radio" id="searchChoice2" name="searchRange" value="this"/>
        <label htmlFor="searchChoice2">В Категории</label>
      </div>
    </form>
  );
}

export default DirectorySearch;