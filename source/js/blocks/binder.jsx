/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';

import Header from './header/header-site';
import MainSite from './main/main-site';

export default class Binder extends Component {
  constructor(props) {
    super(props);

    this.state = { pressedButton: null };

    this.buttonLoadDataHandler = this.buttonLoadDataHandler.bind(this);
  }

  setloadDataButtonStatus(loadIcon) {
    const buttonsLoader = Array.from(document.querySelectorAll('.button-load-data'));
    if (loadIcon.classList.contains('load-icon--visible')) {
      buttonsLoader.forEach((button) => button.setAttribute('disabled', 'true'));
    } else {
      buttonsLoader.forEach((button) => button.removeAttribute('disabled'));
    }
  }

  buttonLoadDataHandler(e) {
    e.preventDefault();
    this.setState(({ pressedButton: e.target }));
  }

  render() {
    const { pressedButton } = this.state;
    return (
      <>
        <Header buttonHandler={this.buttonLoadDataHandler} />
        {pressedButton && <MainSite setloadDataButtonStatus={this.setloadDataButtonStatus} pressedButton={pressedButton} />}
      </>
    );
  }
}
