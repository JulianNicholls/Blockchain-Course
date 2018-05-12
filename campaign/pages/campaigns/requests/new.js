import React from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";

import Layout from "../../../components/Layout";
import campaignInterface from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import { Router, Link } from "../../../routes";

class NewRequest extends React.Component {
  state = {
    description: "",
    amount: "",
    recipient: "",
    busy: false,
    errorMessage: ""
  };

  static async getInitialProps(props) {
    const { address } = props.query;

    // const campaign = campaignInterface(address);

    return { address };
  }

  updateString = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  updateAmount = event => {
    const { value } = event.target;

    if (/^[0-9.]*$/.test(value)) this.setState({ amount: value });
  };

  addRequest = async event => {
    event.preventDefault();

    this.setState({ busy: true, errorMessage: "" });

    const { address } = this.props;
    const { description, amount, recipient } = this.state;

    const campaign = campaignInterface(address);

    try {
      const accounts = await web3.eth.getAccounts();

      await campaign.methods
        .createRequest(
          description,
          web3.utils.toWei(amount, "ether"),
          recipient
        )
        .send({
          from: accounts[0]
        });

      Router.pushRoute(`/campaigns/${address}/requests`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ busy: false });
  };

  valid() {
    const { description, amount, recipient } = this.state;

    return description !== "" && amount !== "" && recipient !== "";
  }

  render() {
    const { address } = this.props;
    const { description, amount, recipient, busy, errorMessage } = this.state;

    return (
      <Layout title="Add Request">
        <Link route={`/campaigns/${address}/requests`}>
          <a>Back</a>
        </Link>
        <h2>Add Request</h2>
        <Form error={errorMessage !== ""} onSubmit={this.addRequest}>
          <Form.Field>
            <label>Description</label>
            <Input
              name="description"
              value={description}
              onChange={this.updateString}
            />
          </Form.Field>
          <Form.Field>
            <label>Amount needed</label>
            <Input
              name="amount"
              label="ether"
              labelPosition="right"
              value={amount}
              onChange={this.updateAmount}
            />
          </Form.Field>
          <Form.Field>
            <label>Recipient Address</label>
            <Input
              name="recipient"
              value={recipient}
              onChange={this.updateString}
            />
          </Form.Field>
          <Message
            error
            header="An error has occurred"
            content={errorMessage}
          />
          <Button primary loading={busy} disabled={!this.valid()}>
            Create
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default NewRequest;
