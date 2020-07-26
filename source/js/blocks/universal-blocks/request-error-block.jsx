/* eslint-disable react/prop-types */
import React from 'react';

export default function RequestErrorBlock(props) {
  const { error } = props;
  return (
    <section className="error-block">
      <h2 className="error-block__name">{error}</h2>
    </section>
  );
}
