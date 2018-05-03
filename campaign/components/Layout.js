import React from 'react';
import Head from 'next/head';
import { Container } from 'semantic-ui-react';

import Header from './Header';

export default props => (
  <React.Fragment>
    <Head>
      <title>BlockStarter {props.title && props.title}</title>
      <link
        rel="stylesheet"
        href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
      />
    </Head>
    <Header />
    <Container>{props.children}</Container>
  </React.Fragment>
);
