import React from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';

import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class NewCampaign extends React.Component {
  state = {
    minimum: '',
    errorMessage: '',
    busy: false
  };

  updateMinimum = event => {
    const value = event.target.value;

    if (/^[0-9.]*$/.test(value)) this.setState({ minimum: value });
  };

  createCampaign = async event => {
    event.preventDefault();

    this.setState({ busy: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();

      await factory.methods.createCampaign(this.state.minimum).send({
        from: accounts[0]
      });

      Router.pushRoute('/'); // Show all campaigns
    } catch (err) {
      console.log({ err });
      this.setState({ errorMessage: err.message });
    }

    this.setState({ busy: false });
  };

  render() {
    const { minimum, errorMessage, busy } = this.state;

    return (
      <Layout title="New Campaign">
        <h2>Create a campaign</h2>
        <Form error={errorMessage !== ''} onSubmit={this.createCampaign}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label="wei"
              labelPosition="right"
              value={minimum}
              onChange={this.updateMinimum}
            />
          </Form.Field>
          <Message error header="An error has occurred" content={errorMessage} />
          <Button primary loading={busy} disabled={minimum === ''}>
            Create
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default NewCampaign;
