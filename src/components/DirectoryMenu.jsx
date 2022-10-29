import React, { useEffect, useState } from 'react';
import fetchApi from '../API/fetchApi';
import './DirectoryMenu.css';

function DirectoryMenu({ select, setSelect, ...props }) {
  const [ category, setCategory] = useState([]);
  const [ mainCategory, setMainCategory ] = useState([])

  useEffect(() => {
    fetchApi.getAllCategory()
      .then((response) => {
        setCategory(response);
        setMainCategory(response);
      })
  }, []);

  useEffect(() => {
    if(select.category){
      fetchApi.getDirectory(select.category, select.subCategory)
        .then((response) => {
          props.setPeople(response)
        })
    }
  }, [ select ])

  function clickCategory(data, event) {
    event.stopPropagation();
    setSelect({ category: data.category, subCategory: data.subCategory });
  }

  function searchCategory(text) {
    if(text === '') {
      setCategory(mainCategory);
    } else {
      const cat = mainCategory.filter((item) => {
        const sub = item.subCategories.filter((itemSub) => {
          return itemSub.category.includes(text);
        });
        
        if(sub.length > 0) {
          return true;
        }
        
        return item.category.includes(text);
      })
  
      setCategory(cat);
    }
  }

  return (    
    <section className='directory__category'>
      <input className='directory__inCategory' type='text' onChange={ (event) => searchCategory(event.currentTarget.value) } />
      <ul className='directory__menu'>
        { 
          category.map(item =>
            item.subCategories ? 
              <li key={ item.id } onClick = { (event) => clickCategory({ category: item.id, subCategory: null }, event) } className='directory__element'>
                { item.category }
                <ul className='directory__sub-menu'>
                  {
                    item.subCategories.map((sub) => <li key={ sub.id } onClick = { (event) => clickCategory({ category: item.id, subCategory: sub.id }, event) } className='directory__element'>{ sub.category }</li>)
                  }
                </ul>
              </li>
              : <li key={ item.id } className='directory__element'>{ item.category }</li>
          )
        }
      </ul>
    </section>
  );
}

export default DirectoryMenu;