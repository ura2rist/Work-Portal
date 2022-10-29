import React, { useState } from 'react';
import DirectoryMenu from '../components/DirectoryMenu';
import DirectorySearch from '../components/DirectorySearch';
import DirectoryTable from '../components/DirectoryTable';
import './Directory.css';

function Directory() {
  const [ people, setPeople ] = useState([]);
  const [ select, setSelect ] = useState({category: null, subCategory: null});

  return (
    <section className='directory'>
        <DirectoryMenu setPeople={ setPeople } select={ select } setSelect={ setSelect } />
      <section className='directory__content'>
        <DirectorySearch setPeople={ setPeople } select={ select }/>
        { people && people.length != 0 ? <DirectoryTable people={ people }/> : <p className='directory__message'>Выберите категорию</p> }
      </section>
    </section>
  );
};

export default Directory;