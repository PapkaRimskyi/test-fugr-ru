/* eslint-disable react/prop-types */
import React from 'react';

export default function RequestButton(props) {
  const { buttonLabel, buttonHandler, buttonID } = props;
  return (
    <button className="button button-load-data" id={buttonID} onClick={buttonHandler} type="button" aria-label={`Загрузить ${buttonLabel} данных`}>{buttonLabel}</button>
  );
}
