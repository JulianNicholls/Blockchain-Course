const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const provider = ganache.provider();
const web3 = new Web3(provider);

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts; // Ganache account list
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  // Get the list of unlocked accounts
  accounts = await web3.eth.getAccounts();

  // Use an account to deploy the factory contract
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: 1000000 });

  factory.setProvider(provider);

  // Use the factory to deploy a campaign contract with 100 wei minimum
  await factory.methods
    .createCampaign('100')
    .send({ from: accounts[0], gas: 1000000 });

  // Retrieve the deployed campaign
  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
  campaign = await new web3.eth.Contract(
    JSON.parse(compiledCampaign.interface),
    campaignAddress
  );
});

describe('Campaign', () => {
  it('contract deployed OK', () => {
    assert.ok(campaign.options.address);
  });

  it('has the correct manager', async () => {
    const manager = await campaign.methods.manager().call();

    assert.equal(manager, accounts[0]);
  });

  it('accepts valid contributions and adds contributor to list', async () => {
    await campaign.methods.contribute().send({
      from: accounts[1],
      value: 100
    });

    const isContributor = await campaign.methods.contributors(accounts[1]).call();

    assert(isContributor);
  });

  it('rejects INvalid (too small) contributions', async () => {
    try {
      await campaign.methods.contribute().send({
        from: accounts[1],
        value: 99 // Not enough
      });

      assert(false);
    } catch (err) {
      assert.equal(err.name, 'c');
    }
  });

  it('allows a manager to make a payment request', async () => {
    await campaign.methods
      .createRequest('Buy Batteries', 100000, accounts[2])
      .send({
        from: accounts[0],
        gas: 1000000
      });

    const thisReq = await campaign.methods.requests(0).call();

    assert.equal(thisReq.description, 'Buy Batteries');
    assert.equal(thisReq.value, 100000);
    assert.equal(thisReq.recipient, accounts[2]);
    assert(!thisReq.complete);
    assert.equal(thisReq.approvalCount, 0);
  });

  it('rejects a payment request from another address', async () => {
    try {
      await campaign.methods
        .createRequest('Buy Batteries', 100000, accounts[2])
        .send({
          from: accounts[1],
          gas: 1000000
        });

      assert(false);
    } catch (err) {
      assert.equal(err.name, 'c');
    }
  });
});

describe('CampaignFactory', () => {
  it('contract deployed OK', () => {
    assert.ok(factory.options.address);
  });
});
