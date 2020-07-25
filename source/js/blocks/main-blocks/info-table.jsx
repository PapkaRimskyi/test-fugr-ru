/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
import React from 'react';

export default function InfoTable(props) {
  const { receivedData, tableHandler } = props;
  return (
    <table className="info-table" onClick={tableHandler}>
      <tbody>
        <tr>
          <th>id</th>
          <th>firstName</th>
          <th>lastName</th>
          <th>email</th>
          <th>phone</th>
        </tr>
        {receivedData.map((info) => (
          <tr className="info-table__user" key={info.email}>
            <td>{info.id}</td>
            <td>{info.firstName}</td>
            <td>{info.lastName}</td>
            <td className="info-table__user-email">{info.email}</td>
            <td>{info.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
