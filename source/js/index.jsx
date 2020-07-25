import React from 'react';
import ReactDOM from 'react-dom';

import '../sass/style.scss';

import Main from './blocks/main';

function Index() {
  return (
    <Main />
  );
}

ReactDOM.render(<Index />, document.getElementById('root'));
