/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';

import NewCellForm from './new-cell-form';
import Pagination from '../../universal-blocks/pagination';
import pageQuantity from '../../../utils/page-quantity';

import '../../../../img/arrow.svg';

import getCertainCountsItem from '../../../utils/get-certain-counts-item';

export default class InfoTable extends Component {
  constructor(props) {
    super(props);

    this.MAX_ITEM_LENGTH = 50;
    this.state = { currentPage: 1, dataIndexSliceFrom: 1, sortTypes: ['id', 'firstName', 'lastName', 'email', 'phone'] };

    this.paginationHandler = this.paginationHandler.bind(this);
  }

  paginationHandler(e) {
    e.preventDefault();
    if (e.target.tagName === 'BUTTON') {
      if (e.target.classList.contains('pagination__button--prev')) {
        this.setState((prevState) => ({ currentPage: prevState.currentPage - 1, dataIndexSliceFrom: prevState.dataIndexSliceFrom - this.MAX_ITEM_LENGTH }));
      } else {
        this.setState((prevState) => ({ currentPage: prevState.currentPage + 1, dataIndexSliceFrom: prevState.dataIndexSliceFrom + this.MAX_ITEM_LENGTH }));
      }
    }
  }

  render() {
    const { sortTypes, currentPage, dataIndexSliceFrom } = this.state;
    const { receivedData, addUserInformation } = this.props;
    const [getMoreUserInformationEnterHandler, getMoreUserInformationHandler, typeSortHandler] = this.props.handlers;
    const [sortDirection, sortTypeButton] = this.props.sortInfo;
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
            {getCertainCountsItem(receivedData, this.MAX_ITEM_LENGTH, dataIndexSliceFrom).map((info) => (
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
        {receivedData.length > this.MAX_ITEM_LENGTH ? <Pagination pageQuantity={pageQuantity(receivedData.length, this.MAX_ITEM_LENGTH)} currentPage={currentPage} paginationHandler={this.paginationHandler} /> : null}
      </>
    );
  }
}
