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

  it('starts with no players', async () => {
    const players = await lottery.methods.getPlayers().call();

    assert.equal(players.length, 0);
  });

  it('adds a single player via enter() with sufficient ether, return via getPlayers()', async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('0.01', 'ether')
    });

    const players = await lottery.methods.getPlayers().call();

    assert.equal(players.length, 1);
    assert.equal(players[0], accounts[0]);
  });

  it('players(idx) returns correct player', async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('0.01', 'ether')
    });

    const player0 = await lottery.methods.players(0).call();

    assert.equal(player0, accounts[0]);
  });

  it('adds multiple players', async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('0.01', 'ether')
    });

    await lottery.methods.enter().send({
      from: accounts[1],
      value: web3.utils.toWei('0.01', 'ether')
    });

    await lottery.methods.enter().send({
      from: accounts[2],
      value: web3.utils.toWei('0.01', 'ether')
    });

    const players = await lottery.methods.getPlayers().call();

    assert.equal(players.length, 3);
    assert.equal(players[0], accounts[0]);
    assert.equal(players[1], accounts[1]);
    assert.equal(players[2], accounts[2]);
  });

  it('rejects a player with INsufficient ether', async () => {
    try {
      await lottery.methods.enter().send({
        from: accounts[0],
        value: 200 // Not enough
      });

      assert(false); // Should NOT get here
    } catch (err) {
      assert(err); // Should get here
    }
  });

  it('picks a winner successfully using manager', async () => {
    await lottery.methods.enter().send({
      from: accounts[1],
      value: web3.utils.toWei('2', 'ether')
    });

    // Store balance after entry
    const initialBalance = await web3.eth.getBalance(accounts[1]);

    await lottery.methods.pickWinner().send({ from: accounts[0] });

    // Ensure that the money comes back
    const finalBalance = await web3.eth.getBalance(accounts[1]);

    assert(finalBalance - initialBalance > web3.utils.toWei('1.95', 'ether'));

    // Check that the winner has been stored correctly

    const winner = await lottery.methods.lastWinner().call();

    assert(winner == accounts[1]);

    // Ensure the list is cleared out after picking a winner
    const players = await lottery.methods.getPlayers().call();

    assert.equal(players.length, 0);
  });

  it('rejects picking a winner by anyone else', async () => {
    // Needs at least one entrant, otherwise the modulo operation will fail
    // giving a potential false positive here
    await lottery.methods.enter().send({
      from: accounts[1],
      value: web3.utils.toWei('0.01', 'ether')
    });

    try {
      await lottery.methods.pickWinner().send({ from: accounts[1] });

      assert(false);
    } catch (err) {
      assert(err);
    }
  });
});
