/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
import React from 'react';

import NewCellForm from './new-cell-form';

import '../../../../img/arrow.svg';

export default function InfoTable(props) {
  const { receivedData, addUserInformation } = props;
  const [getMoreUserInformationEnterHandler, getMoreUserInformationHandler, typeSortHandler] = props.handlers;
  const [sortDirection, sortTypeButton] = props.sortInfo;
  const sortTypes = ['id', 'firstName', 'lastName', 'email', 'phone'];
  return (
    <>
      <NewCellForm sortTypes={sortTypes} addUserInformation={addUserInformation} />
      <table className="info-table" onClick={getMoreUserInformationHandler} onKeyDown={getMoreUserInformationEnterHandler}>
        <tbody>
          <tr className="info-table__column-types" onClick={typeSortHandler}>
            {sortTypes.map((type) => (
              <th className="info-table__column-type" id={`type-${type}`} key={type} aria-label={`Сортировка по ${type}`}>
                <button className={`button info-table__sort-button info-table__sort-button--${sortTypeButton === type && sortDirection ? 'sort-up' : 'sort-down'}`} type="button">{type}</button>
              </th>
            ))}
          </tr>
          {receivedData.map((info) => (
            <tr className="info-table__user" tabIndex="0" key={info.email}>
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
