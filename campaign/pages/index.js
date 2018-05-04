import React from 'react';
import { Button, Card, Message } from 'semantic-ui-react';

import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';

class CampaignIndex extends React.Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();

    return { campaigns };
  }

  renderCampaigns() {
    const { campaigns } = this.props;

    if (campaigns.length > 0) {
      const items = campaigns.map(address => {
        return {
          header: address,
          description: (
            <Link route={`/campaigns/${address}`}>
              <a>View Campaign</a>
            </Link>
          ),
          fluid: true
        };
      });

      return <Card.Group items={items} />;
    } else {
      return <h3>No campaigns have been launched</h3>;
    }
  }

  render() {
    return (
      <Layout title="Campaigns">
        <h2>Open Campaigns</h2>
        <Link route="/campaigns/new">
          <a>
            <Button
              floated="right"
              content="Create Campaign"
              icon="add circle"
              primary
            />
          </a>
        </Link>
        {this.renderCampaigns()}
      </Layout>
    );
  }
}

export default CampaignIndex;
