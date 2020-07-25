/* eslint-disable class-methods-use-this */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';

import InfoTable from './info-table';
import ErrorBlock from '../../utils/error-block';
import UserInformation from '../../utils/user-information';

export default class MainSite extends Component {
  constructor(props) {
    super(props);

    this.smallDataLink = 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
    this.bigDataLink = 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
    this.state = {
      sortDirection: false, sortTypeButton: null, data: null, errorInfo: { status: false, text: '' }, userInformation: null,
    };

    this.loadIcon = document.querySelector('.load-icon');

    this.getDataFromServer = this.getDataFromServer.bind(this);
    this.loadingIcon = this.loadingIcon.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.typeSortHandler = this.typeSortHandler.bind(this);
    this.userCellDelegationHandler = this.userCellDelegationHandler.bind(this);
    this.sortData = this.sortData.bind(this);
    this.checkSortDirection = this.checkSortDirection.bind(this);
  }

  componentDidMount() {
    this.getDataFromServer();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.pressedButton !== this.props.pressedButton) {
      this.getDataFromServer();
    }
  }

  getDataFromServer() {
    const { pressedButton } = this.props;
    if (pressedButton.id === 'small-data') {
      this.fetchData(this.smallDataLink);
    } else {
      this.fetchData(this.bigDataLink);
    }
  }

  fetchData(url) {
    this.loadingIcon();
    fetch(url)
      .then((response) => (response.ok ? response.json() : Promise.reject(response)))
      .then((result) => {
        this.loadingIcon();
        this.setState({ errorInfo: { status: false, text: '' }, data: result });
      })
      .catch((e) => {
        this.loadingIcon();
        this.setState({ errorInfo: { status: true, text: e.status ? `Номер ошибки - ${e.status}. ${e.statusText}.` : 'Произошла неизвестная ошибка. Попробуйте позже.' } });
      });
  }

  loadingIcon() {
    const { dataButtonStatus } = this.props;
    if (this.loadIcon.classList.contains('load-icon--visible')) {
      this.loadIcon.classList.remove('load-icon--visible');
      dataButtonStatus(this.loadIcon);
    } else {
      this.loadIcon.classList.add('load-icon--visible');
      dataButtonStatus(this.loadIcon);
    }
  }

  userCellDelegationHandler(e) {
    if (e.target.closest('.info-table__user')) {
      const { data } = this.state;
      this.setState({ userInformation: data.find((user) => (user.email === e.target.closest('.info-table__user').querySelector('.info-table__user-email').textContent ? user : '')) });
    }
  }

  checkSortDirection(target) {
    if (!target.classList.contains('info-table__column-type--sort-up')) {
      return true;
    }
    return false;
  }

  typeSortHandler(e) {
    const sortDirection = this.checkSortDirection(e.target);
    this.setState({ data: this.sortData(e.target.textContent, sortDirection), sortDirection, sortTypeButton: e.target.textContent });
  }

  sortData(sortType, sortDirection) {
    const { data } = this.state;
    if (sortDirection) {
      switch (sortType) {
        case 'id':
          return data.sort((a, b) => a.id - b.id);
        case 'firstName':
        case 'lastName':
        case 'email':
          return data.sort((a, b) => {
            if (a[sortType] > b[sortType]) {
              return 1;
            } if (a[sortType] < b[sortType]) {
              return -1;
            }
            return 0;
          });
        case 'phone':
          return data.sort((a, b) => a.phone.replace(/[^\d]/g, '') - b.phone.replace(/[^\d]/g, ''));
        default:
          return data;
      }
    }
    return data.reverse();
  }

  render() {
    const { data, errorInfo, userInformation, sortDirection, sortTypeButton } = this.state;
    return (
      <main className="main">
        {!errorInfo.status && data ? <InfoTable userCellDelegationHandler={this.userCellDelegationHandler} typeSortHandler={this.typeSortHandler} receivedData={data} sortInfo={[sortDirection, sortTypeButton]} /> : <ErrorBlock error={errorInfo.text} />}
        {userInformation && <UserInformation userInformation={userInformation} />}
      </main>
    );
  }
}
