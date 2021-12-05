import React from 'react';

function Directory() {
  return (
    <section className='directory'>
      <section className='directory__category'>
        <ul className='directory__menu'>
          <li className='directory__element'>Категория 1</li>
          <li className='directory__element'>Категория 2</li>
          <li className='directory__element'>
            Категория 3
            <ul className='directory__sub-menu'>
              <li className='directory__element'>Категория 3_1</li>
              <li className='directory__element'>Категория 3_2</li>
              <li className='directory__element'>Категория 3_3</li>
              <li className='directory__element'>Категория 3_4</li>
            </ul>
          </li>
          <li className='directory__element'>Категория 4</li>
        </ul>
      </section>
      <section className='directory__content'>
        <form action='' className='directory__form'>
          <input type='text' placeholder='Поиск' className='directory__search'/>
          <input type='submit' className='directory__button' value='Поиск'/>
          <div style={{width: '80%'}}>
            <input type="radio" id="contactChoice1" name="contact" value="email" checked/>
            <label for="contactChoice1">Везде</label>
            <input type="radio" id="contactChoice2" name="contact" value="phone"/>
            <label for="contactChoice2">В Категории</label>
          </div>
        </form>
        <table className='directory__table'>
          <tr>
            <th>ФИО</th>
            <th>Должность</th>
            <th>Строение</th>
            <th>Этаж</th>
            <th>Внешний телефон</th>
            <th>Внутренний телефон</th>
          </tr>
        </table>
      </section>
    </section>
  );
};

export default Directory;