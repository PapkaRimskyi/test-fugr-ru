/* eslint-disable no-useless-constructor */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';

import scrollTo from '../../../utils/scroll-to';
import checkObjectProperty from '../../../utils/check-object-property';

export default class UserInformation extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    scrollTo(document.querySelector('.user-information'));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userInformation !== this.props.userInformation) {
      scrollTo(document.querySelector('.user-information'));
    }
  }

  render() {
    const { userInformation } = this.props;
    const hasUserDetailedInformation = checkObjectProperty(userInformation, 'address');
    const {
      streetAddress, city, state, zip,
    } = hasUserDetailedInformation ? userInformation.address : false;
    return (
      <section className="user-information">
        <h3 className="user-information__selected-user">{`Выбранный пользователь: ${userInformation.firstName} ${userInformation.lastName}`}</h3>
        {hasUserDetailedInformation
          ? (
            <>
              <textarea className="user-information__user-description" name="user-description" id="user-description" value={userInformation.description} rows="5" readOnly />
              <ul className="user-information__info-list">
                <li className="user-information__info-item">
                  <p className="user-information__info">Адрес проживания: <b>{streetAddress}</b></p>
                </li>
                <li className="user-information__info-item">
                  <p className="user-information__info">Город: <b>{city}</b></p>
                </li>
                <li className="user-information__info-item">
                  <p className="user-information__info">Провинция/штат: <b>{state}</b></p>
                </li>
                <li className="user-information__info-item">
                  <p className="user-information__info">Индекс: <b>{zip}</b></p>
                </li>
              </ul>
            </>
          )
          : <p className="user-information__none-detailed-info">У такого пользователя отсутствует дополнительная информация.</p>}
        <button className="button" type="button" onClick={scrollTo.bind(this, document.body)} aria-label="К началу страницы">В начало страницы</button>
      </section>
    );
  }
}
