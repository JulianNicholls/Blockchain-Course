import React from 'react';
import { Header } from 'semantic-ui-react';

export default props => (
  <React.Fragment>
    <link
      rel="stylesheet"
      href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
    />
    <header>
      <h1>Header</h1>
    </header>
    {props.children}
    <footer>Footer!</footer>
  </React.Fragment>
);
