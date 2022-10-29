import React from 'react';
import './DirectoryTable.css';

function CallPrint() {
  window.print();
}
function DirectoryTable({ people }) {
  return (
    <section>
       <h4 className='print' onClick={ () => CallPrint() }>Печать</h4>
      <div id='print'>
        { people.map(item =>
          <React.Fragment key={ item.id }>
          <h2 className='directory__categoryTitle'>{ item.category }</h2>
            {
              item.subCategory.map(subCategory =>
                <div key={ subCategory.id }>
                  <h3 className='directory__suCatTitle'>{ subCategory.name }</h3>
                  <div className='directory_wrapp'>
                    <table className='directory__table' key={ subCategory.id }>
                      <thead>
                        <tr>
                          <th>ФИО</th>
                          <th>Должность</th>
                          <th>Внешний телефон</th>
                          <th>Внутренний телефон</th>
                          <th>Описание</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          subCategory.data.map(data =>
                            <tr key={ data.id }>
                              <td>{ data.name }</td>
                              <td>{ data.rank }</td>
                              <td>{ data.phone }</td>
                              <td>{ data.mainPhone }</td>
                              <td>{ data.description }</td>
                            </tr>
                          )
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              )
            }
          </React.Fragment>
        ) }
      </div>
    </section>
  );
}

export default DirectoryTable;