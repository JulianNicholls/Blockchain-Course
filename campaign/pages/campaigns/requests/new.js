import React from 'react';

import Layout from '../../../components/Layout';

class NewRequest extends React.Component {
  static async getInitialProps(props) {
    const {
      query: { address }
    } = props;

    // const campaign = campaignInterface(address);

    return { address };
  }

  render() {
    return (
      <Layout title="Add Request">
        <h2>Add Request</h2>
      </Layout>
    );
  }
}

export default NewRequest;
