import React from 'react';
import { Button, Table } from 'semantic-ui-react';

import Layout from '../../../components/Layout';
import RequestRow from '../../../components/RequestRow';
import { Link } from '../../../routes';
import campaignInterface from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';

class ShowRequests extends React.Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    const campaign = campaignInterface(address);
    const requestCount = await campaign.methods.getRequestsCount().call();
    const contributorsCount = await campaign.methods.contributorsCount().call();

    const requests = await Promise.all(
      Array(parseInt(requestCount, 10))
        .fill()
        .map((element, index) => campaign.methods.requests(index).call())
    );

    return { address, requestCount, requests, contributorsCount };
  }

  renderRows() {
    const { address, requests, contributorsCount } = this.props;

    return requests.map((request, index) => (
      <RequestRow
        key={index}
        id={index}
        request={request}
        address={address}
        contributorsCount={contributorsCount}
      />
    ));
  }

  renderTable() {
    const { Header, HeaderCell, Row, Body } = Table;

    return (
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount (ether)</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval Count</HeaderCell>
            <HeaderCell colSpan="2">Actions</HeaderCell>
          </Row>
        </Header>
        <Body>{this.renderRows()}</Body>
      </Table>
    );
  }

  render() {
    const { address } = this.props;

    return (
      <Layout title="Request List">
        <h2>Pending Requests</h2>
        <Link route={`/campaigns/${address}/requests/new`}>
          <a>
            <Button primary>Add Request</Button>
          </a>
        </Link>
        {this.renderTable()}
      </Layout>
    );
  }
}

export default ShowRequests;
