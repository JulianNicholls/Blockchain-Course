import React from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';

import campaignInterface from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class ContributeForm extends React.Component {
  state = {
    value: '',
    errorMessage: '',
    busy: false
  };

  updateValue = event => {
    const { value } = event.target;

    if (/^[0-9.]*$/.test(value)) this.setState({ value });
  };

  makeContribution = async event => {
    event.preventDefault();

    this.setState({ busy: true, errorMessage: '' });

    const { address } = this.props;
    const campaign = campaignInterface(address);

    try {
      const accounts = await web3.eth.getAccounts();

      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, 'ether')
      });

      Router.replaceRoute(`/campaigns/${address}`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ busy: false, value: '' });
  };

  render() {
    const { value, errorMessage, busy } = this.state;

    return (
      <Form error={errorMessage !== ''} onSubmit={this.makeContribution}>
        <h3>Contribute to this campaign</h3>
        <Form.Field>
          <label>Amount to contribute</label>
          <Input
            label="ether"
            labelPosition="right"
            value={value}
            onChange={this.updateValue}
          />
        </Form.Field>
        <Message error header="An error has occurred" content={errorMessage} />
        <Button primary loading={busy} disabled={value === ''}>
          Contribute
        </Button>
      </Form>
    );
  }
}

export default ContributeForm;
