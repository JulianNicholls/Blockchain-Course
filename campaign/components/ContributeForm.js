import React from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';

class ContributeForm extends React.Component {
  render() {
    return (
      <Form>
        <h3>Contribute to this campaign</h3>
        <Form.Field>
          <label>Amount to contribute</label>
          <Input label="ether" labelPosition="right" />
        </Form.Field>
        <Button primary>Contribute</Button>
      </Form>
    );
  }
}

export default ContributeForm;
