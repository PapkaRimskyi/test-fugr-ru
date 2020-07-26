/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';

import userInformationFormatting from '../../../utils/user-information-formatting';

export default class NewCellForm extends Component {
  constructor(props) {
    super(props);

    this.state = { formStatus: false };

    this.switchFormHandler = this.switchFormHandler.bind(this);
    this.sendFormHandler = this.sendFormHandler.bind(this);
  }

  cellForm() {
    const { sortTypes: inputNames } = this.props;
    return (
      <form method="post" className="add-cell__form" onSubmit={this.sendFormHandler}>
        <fieldset className="add-cell__fieldset">
          <ul className="add-cell__input-list">
            {inputNames.map((input) => (
              <li key={`input-${input}`} className="add-cell__item">
                <input className="add-cell__input" name={input} type={input === 'id' ? 'number' : input === 'email' ? 'email' : input === 'phone' ? 'tel' : 'text'} min={input === 'id' ? '0' : null} pattern={input === 'firstName' || input === 'lastName' ? '^[a-zA-Z]+$' : input === 'phone' ? '[0-9]{3}[0-9]{3}[0-9]{4}' : null} placeholder={input} required />
              </li>
            ))}
          </ul>
        </fieldset>
        <button type="submit" className="button add-cell__submit-form" aria-label="Добавить строку в таблицу">Добавить в таблицу</button>
      </form>
    );
  }

  switchFormHandler(e) {
    e.preventDefault();
    this.setState((prevState) => ({ formStatus: !prevState.formStatus }));
  }

  sendFormHandler(e) {
    e.preventDefault();
    const { addUserInformation } = this.props;
    const formatedUserInformation = userInformationFormatting(Object.fromEntries(new FormData(e.target).entries()));
    this.switchFormHandler(e);
    return addUserInformation(formatedUserInformation);
  }

  render() {
    const { formStatus } = this.state;
    return (
      <section className="add-cell">
        {!formStatus ? <button className="button add-cell__show-form" type="button" onClick={this.switchFormHandler} aria-label="Открыть форму создания новой строки">Добавить</button> : this.cellForm()}
      </section>
    );
  }
}
