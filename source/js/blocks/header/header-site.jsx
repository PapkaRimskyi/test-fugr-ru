/* eslint-disable react/prop-types */
import React from 'react';
import RequestButton from '../universal-buttons/request-button';
import RequestLoadIcon from '../universal-buttons/request-load-icon';

export default function Header(props) {
  const { buttonHandler } = props;
  return (
    <header className="header">
      <div className="introductory-block">
        <h1 className="introductory-block__condition">Для загрузки определенного типа данных нужно кликнуть на соответствующую кнопку</h1>
        <div className="introductory-block__button-container">
          <RequestButton buttonHandler={buttonHandler} buttonLabel="маленький набор" buttonID="small-data" />
          <RequestLoadIcon />
          <RequestButton buttonHandler={buttonHandler} buttonLabel="большой набор" buttonID="big-data" />
        </div>
      </div>
    </header>
  );
}
