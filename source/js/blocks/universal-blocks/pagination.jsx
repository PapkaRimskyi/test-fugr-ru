/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React from 'react';

export default function Pagination(props) {
  const { pageQuantity, currentPage, paginationHandler } = props;
  return (
    <section className="pagination" onClick={paginationHandler}>
      <button className="pagination__button pagination__button--prev" type="button" aria-label="Предыдущая страница" disabled={currentPage === 1 ? true : null} />
      <p className="pagination__page-info">{`${currentPage} / ${pageQuantity}`}</p>
      <button className="pagination__button pagination__button--next" aria-label="Следующая страница" type="button" disabled={currentPage === pageQuantity ? true : null} />
    </section>
  );
}
