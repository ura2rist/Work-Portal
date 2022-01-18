import React, { useEffect, useState } from 'react';
import DirectoryMenu from '../components/DirectoryMenu';
import DirectoryTable from '../components/DirectoryTable';

let status = true;

function Directory() {
  const [ people, setPeople ] = useState([]);

  return (
    <section className='directory'>
      <section className='directory__category'>
        <DirectoryMenu people={ setPeople } />
      </section>
      <section className='directory__content'>
        {/* <form action='' className='directory__form'>
          <input type='text' placeholder='Поиск' className='directory__search'/>
          <input type='submit' className='directory__button' value='Поиск'/>
          <div style={{width: '80%'}}>
            <input type="radio" id="contactChoice1" name="contact" value="email" checked/>
            <label for="contactChoice1">Везде</label>
            <input type="radio" id="contactChoice2" name="contact" value="phone"/>
            <label for="contactChoice2">В Категории</label>
          </div>
        </form> */}
        { status ? <DirectoryTable /> : <p>Выберите категорию</p> }
      </section>
    </section>
  );
};

export default Directory;