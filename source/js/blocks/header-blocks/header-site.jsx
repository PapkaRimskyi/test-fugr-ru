/* eslint-disable react/prop-types */
import React from 'react';
import Button from '../../utils/button';
import LoadIcon from '../../utils/load-icon';

export default function Header(props) {
  const { buttonHandler } = props;
  return (
    <header className="header">
      <div className="introductory-block">
        <h1 className="introductory-block__condition">Для загрузки определенного типа данных нужно кликнуть на соответствующую кнопку</h1>
        <div className="introductory-block__button-container">
          <Button buttonHandler={buttonHandler} buttonLabel="Маленький набор" buttonID="small-data" />
          <LoadIcon />
          <Button buttonHandler={buttonHandler} buttonLabel="Большой набор" buttonID="big-data" />
        </div>
      </div>
    </header>
  );
}
