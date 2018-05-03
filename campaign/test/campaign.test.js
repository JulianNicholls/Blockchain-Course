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
});

describe('CampaignFactory', () => {
  it('contract deployed OK', () => {
    assert.ok(factory.options.address);
  });
});
