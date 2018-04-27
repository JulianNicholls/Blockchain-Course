const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { interface, bytecode } = require('../compile');

const provider = ganache.provider();
const web3 = new Web3(provider);

let accounts; // Ganache account list
let inbox; // Contract

beforeEach(async () => {
  // Get the list of unlocked accounts
  accounts = await web3.eth.getAccounts();

  // Use an account to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Initial Message'] })
    .send({ from: accounts[0], gas: '1000000' });

  inbox.setProvider(provider);
});

describe('Inbox', () => {
  it('contract deployed OK', () => {
    assert.ok(inbox.options.address);
  });

  it('has the default message stored', async () => {
    const message = await inbox.methods.message().call();

    assert.equal(message, 'Initial Message');
  });

  it('can update the stored message', async () => {
    // It's actually superfluous to store the transaction, because a failure here
    // will throw an error...
    const transaction = await inbox.methods.setMessage('Updated Message').send({
      from: accounts[0]
    });

    const message = await inbox.methods.message().call();

    assert.ok(transaction); // ...hence, this is redundant too
    assert.equal(message, 'Updated Message');
  });
});
