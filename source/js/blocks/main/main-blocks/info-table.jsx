/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
import React from 'react';

import NewCellForm from './new-cell-form';

import '../../../../img/arrow.svg';

export default function InfoTable(props) {
  const { receivedData, getMoreUserInformationHandler, typeSortHandler, addUserInformation } = props;
  const [sortDirection, sortTypeButton] = props.sortInfo;
  const sortTypes = ['id', 'firstName', 'lastName', 'email', 'phone'];
  return (
    <>
      <NewCellForm addUserInformation={addUserInformation} />
      <table className="info-table" onClick={getMoreUserInformationHandler}>
        <tbody>
          <tr className="info-table__column-types" onClick={typeSortHandler}>
            {sortTypes.map((type) => (
              <th className={`info-table__column-type ${sortTypeButton === type && sortDirection ? 'info-table__column-type--sort-up' : 'info-table__column-type--sort-down'}`} id={`type-${type}`} key={type} aria-label={`Сортировка по ${type}`}>
                {type}
                <svg className="info-table__sort-direction" version="1.0" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#b4b5b5" viewBox="0 0 1280 1280"><path d="M314.5 1.5c-4.9 1.7-9 6.2-10.4 11.2-.8 2.6-1.1 69.7-1.1 214.5V438H175.5c-104.9 0-128.1.2-130.8 1.4-7.8 3.2-12.4 13.2-9.7 20.8 1.3 3.6 579.3 678.6 584.1 682.1 4 2.9 11.1 3.4 16.1 1.1 3.4-1.5 29.1-31.5 163.3-190.9 87.6-103.9 215.3-255.6 283.9-337 68.7-81.4 126-149.7 127.4-151.8 4.7-7.1 2.8-16.8-4.5-22.4l-3.6-2.8-129.4-.3L943 438V11.3l-2.3-3.4c-1.2-1.9-4.2-4.4-6.7-5.7L929.6 0H624C363.3.1 317.9.3 314.5 1.5z" /></svg>
              </th>
            ))}
          </tr>
          {receivedData.map((info) => (
            <tr className="info-table__user" key={info.email}>
              <td>{info.id}</td>
              <td>{info.firstName}</td>
              <td>{info.lastName}</td>
              <td className="info-table__user-email">{info.email}</td>
              <td>{info.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
