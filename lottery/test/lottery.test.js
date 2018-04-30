const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { interface, bytecode } = require('../compile');

const provider = ganache.provider();
const web3 = new Web3(provider);

let accounts; // Ganache account list
let lottery; // Contract

beforeEach(async () => {
  // Get the list of unlocked accounts
  accounts = await web3.eth.getAccounts();

  // Use an account to deploy the contract
  lottery = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: 1000000 });

  lottery.setProvider(provider);
});

describe('Lottery', () => {
  it('contract deployed OK', () => {
    assert.ok(lottery.options.address);
  });
});
