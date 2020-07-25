/* eslint-disable react/prop-types */
import React from 'react';

export default function Button(props) {
  const { buttonLabel, buttonHandler, buttonID } = props;
  return (
    <button className="button button-load-data" id={buttonID} onClick={buttonHandler} type="button">{buttonLabel}</button>
  );
}
