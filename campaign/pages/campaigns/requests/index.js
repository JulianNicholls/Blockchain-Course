import React from 'react';
import { Button } from 'semantic-ui-react';

import Layout from '../../../components/Layout';
import { Link } from '../../../routes';

class ShowRequests extends React.Component {
  static async getInitialProps(props) {
    const {
      query: { address }
    } = props;

    // const campaign = campaignInterface(address);

    return { address };
  }

  render() {
    const { address } = this.props;

    return (
      <Layout title="Request List">
        <h2>Request List</h2>
        <Link route={`/campaigns/${address}/requests/new`}>
          <a>
            <Button primary>Add Request</Button>
          </a>
        </Link>
      </Layout>
    );
  }
}

export default ShowRequests;
