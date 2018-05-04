import React from 'react';
import { Card } from 'semantic-ui-react';

import Layout from '../../components/Layout';
import campaignInterface from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';

class ShowCampaign extends React.Component {
  static async getInitialProps(props) {
    const {
      query: { address }
    } = props;

    const campaign = campaignInterface(address);
    const summary = await campaign.methods.getSummary().call();

    const {
      0: minContribution,
      1: balance,
      2: requests,
      3: contributors,
      4: manager
    } = summary;

    return { minContribution, balance, requests, contributors, manager, address };
  }

  renderSummary() {
    const {
      minContribution,
      balance,
      requests,
      contributors,
      manager
    } = this.props;

    const items = [
      {
        header: manager,
        meta: 'Address of Manager',
        description:
          'The manager created this campaign and can create requests to withdraw money',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: minContribution,
        meta: 'Minimum Contribution',
        description:
          'The minimum amount in wei that must be contributed to the campaign to become a request approver'
      },
      {
        header: requests,
        meta: 'Number of Requests',
        description:
          'A request asks to withdraw money from the campaign. Requests must be approved by a majority of contributors'
      },
      {
        header: contributors,
        meta: 'Number of Contributors',
        description:
          'The number of people who have already contributed to this campaign'
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Campaign Balance (ether)',
        description:
          'The total amount in ether of unused cntributions in the campaign'
      }
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout title="Show Campaign">
        <h2>
          Campaign Details - <small>{this.props.address}</small>
        </h2>
        {this.renderSummary()}
      </Layout>
    );
  }
}

export default ShowCampaign;
