import React from 'react';
import { Button, Card } from 'semantic-ui-react';

import factory from '../ethereum/factory';
import Layout from '../components/Layout';

class CampaignIndex extends React.Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();

    return { campaigns };
  }

  renderCampaigns() {
    const items = this.props.campaigns.map(address => {
      return {
        header: address,
        description: <a href="#">View Campaign</a>,
        fluid: true
      };
    });

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout title="Campaigns">
        <h2>Open Campaigns</h2>
        <Button
          floated="right"
          content="Create Campaign"
          icon="add circle"
          primary
        />
        {this.renderCampaigns()}
      </Layout>
    );
  }
}

export default CampaignIndex;
