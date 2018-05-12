import React from 'react';

import { Button, Table } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import campaignInterface from '../ethereum/campaign';

class RequestRow extends React.Component {
  approveRequest = async event => {
    const { address, id } = this.props;
    const campaign = campaignInterface(address);
    const accounts = await web3.eth.getAccounts();

    await campaign.methods.approveRequest(id).send({
      from: accounts[0]
    });
  };

  render() {
    const { Row, Cell } = Table;
    const {
      id,
      request: { description, value, recipient, approvalCount },
      contributorsCount
    } = this.props;

    return (
      <Row>
        <Cell>{id + 1}</Cell>
        <Cell>{description}</Cell>
        <Cell>{web3.utils.fromWei(value, 'ether')}</Cell>
        <Cell>{recipient}</Cell>
        <Cell>
          {approvalCount}/{contributorsCount}
        </Cell>
        <Cell>
          <Button color="green" basic onClick={this.approveRequest}>
            Approve
          </Button>
        </Cell>
      </Row>
    );
  }
}

export default RequestRow;
