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
      sortType: 'id', data: null, errorInfo: { status: false, text: '' }, userInformation: null,
    };

    this.loadIcon = document.querySelector('.load-icon');

    this.getDataFromServer = this.getDataFromServer.bind(this);
    this.loadingIcon = this.loadingIcon.bind(this);
    this.fetchData = this.fetchData.bind(this);

    this.tableHandler = this.tableHandler.bind(this);
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

  tableHandler(e) {
    if (e.target.closest('.info-table__user')) {
      const { data } = this.state;
      this.setState({ userInformation: data.find((user) => (user.email === e.target.closest('.info-table__user').querySelector('.info-table__user-email').textContent ? user : '')) });
    }
  }

  render() {
    const { data, errorInfo, userInformation } = this.state;
    return (
      <main className="main">
        {!errorInfo.status && data ? <InfoTable tableHandler={this.tableHandler} receivedData={data} /> : <ErrorBlock error={errorInfo.text} />}
        {userInformation && <UserInformation userInformation={userInformation} />}
      </main>
    );
  }
}
