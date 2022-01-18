import React, { useEffect, useState } from 'react';
import fetchApi from '../API/fetchApi';

function DirectoryMenu({ setPeople }) {
  const [ category, setCategory] = useState([]);
  const [ select, setSelect ] = useState({category: null, subCategory: null});

  useEffect(() => {
    fetchApi.getAllCategory()
      .then((response) => {
        setCategory(response)
      })
  }, []);

  useEffect(() => {
    if(select.category){
      fetchApi.getDirectory(select.category, select.subCategory)
        .then((response) => {
          console.log(response)
        })
    }
  }, [ select ])

  function clickCategory(data, event) {
    event.stopPropagation();
    setSelect({ category: data.category, subCategory: data.subCategory });
  }

  return (    
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
  );
}

export default DirectoryMenu;