import React from 'react';

function DirectoryTable({ people }) {
  return (
    <section>
      { people.map(item =>
        <React.Fragment key={ item.id }>
        <h2>{ item.category }</h2>
          {
            item.subCategory.map(subCategory =>
              <table className='directory__table' key={ subCategory.id }>
                <caption>{ subCategory.name }</caption>
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
                      <tr key={ data }>
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
            )
          }
        </React.Fragment>
      ) }
    </section>
  );
}

export default DirectoryTable;