import React from 'react';

import Header from './Header';

export default props => (
  <React.Fragment>
    <link
      rel="stylesheet"
      href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
    />
    <Header />
    {props.children}
  </React.Fragment>
);
