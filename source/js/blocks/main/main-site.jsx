/* eslint-disable class-methods-use-this */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';

import InfoTable from './main-blocks/info-table';
import RequestErrorBlock from '../universal-blocks/request-error-block';
import UserInformation from './main-blocks/user-information';

import sortData from '../../utils/sort-data';
import fetchDataRequest from '../../utils/data-request';

export default class MainSite extends Component {
  constructor(props) {
    super(props);

    this.smallDataLink = 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
    this.bigDataLink = 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
    this.state = {
      sortDirection: false, sortTypeButton: null, data: null, errorInfo: { status: false, text: '' }, userInformation: null,
    };

    this.loadIcon = document.querySelector('.load-icon');

    this.typeSortHandler = this.typeSortHandler.bind(this);
    this.getMoreUserInformationHandler = this.getMoreUserInformationHandler.bind(this);
    this.addUserInformation = this.addUserInformation.bind(this);
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
    fetchDataRequest.call(this, pressedButton.id === 'small-data' ? this.smallDataLink : this.bigDataLink);
  }

  getMoreUserInformationHandler(e) {
    if (e.target.closest('.info-table__user')) {
      const { data } = this.state;
      this.setState({ userInformation: data.find((user) => (user.email === e.target.closest('.info-table__user').querySelector('.info-table__user-email').textContent ? user : '')) });
    }
  }

  loadingIcon() {
    const { setloadDataButtonStatus } = this.props;
    if (this.loadIcon.classList.contains('load-icon--visible')) {
      this.loadIcon.classList.remove('load-icon--visible');
      setloadDataButtonStatus(this.loadIcon);
    } else {
      this.loadIcon.classList.add('load-icon--visible');
      setloadDataButtonStatus(this.loadIcon);
    }
  }

  checkSortDirection(target) {
    if (!target.classList.contains('info-table__column-type--sort-up')) {
      return true;
    }
    return false;
  }

  typeSortHandler(e) {
    const { data } = this.state;
    const sortDirection = this.checkSortDirection(e.target);
    this.setState({ data: sortData(data, e.target.textContent, sortDirection), sortDirection, sortTypeButton: e.target.textContent });
  }

  addUserInformation(userInfo) {
    this.setState((prevState) => ({ data: [userInfo, ...prevState.data] }));
  }

  render() {
    const { data, errorInfo, userInformation, sortDirection, sortTypeButton } = this.state;
    return (
      <main className="main">
        {!errorInfo.status && data ? <InfoTable getMoreUserInformationHandler={this.getMoreUserInformationHandler} addUserInformation={this.addUserInformation} typeSortHandler={this.typeSortHandler} receivedData={data} sortInfo={[sortDirection, sortTypeButton]} /> : <RequestErrorBlock error={errorInfo.text} />}
        {userInformation && <UserInformation userInformation={userInformation} />}
      </main>
    );
  }
}
