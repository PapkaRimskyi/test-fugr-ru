/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';

import Header from './header-blocks/header-site';
import MainSite from './main-blocks/main-site';

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = { pressedButton: null };

    this.buttonLoadDataHandler = this.buttonLoadDataHandler.bind(this);
  }

  setDataButtonStatus(loadIcon) {
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
        {pressedButton && <MainSite dataButtonStatus={this.setDataButtonStatus} pressedButton={pressedButton} />}
      </>
    );
  }
}
