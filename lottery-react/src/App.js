import React from 'react';
import './App.css';

import web3 from './web3';
import lottery from './lottery';

class App extends React.Component {
  state = {
    manager: '',
    players: [],
    balance: '',
    value: '',
    message: ''
  };

  componentDidMount() {
    web3.eth.getAccounts().then(console.log);

    this.refresh();
  }

  refresh = async () => {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState(() => ({ manager, players, balance }));
  };

  enterLottery = async event => {
    event.preventDefault();

    this.setState({ message: 'You are being entered. Waiting for response...' });

    const accounts = await web3.eth.getAccounts();

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });

    this.refresh();

    this.setState({ message: 'You have been entered.' });
  };

  pickWinner = async () => {
    this.setState({ message: 'A winner is being picked. Waiting for response...' });

    const accounts = await web3.eth.getAccounts();

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    const winner = await lottery.methods.lastWinner().call();

    this.refresh();

    this.setState({ message: `A winner has been chosen: ${winner}` });
  };

  render() {
    return (
      <div className="container">
        <h2>Lottery Contract</h2>
        <p>
          This lottery is managed by <strong>{this.state.manager}</strong>
          <br />
          There are currently <strong>{this.state.players.length}</strong> players
          competing to win{' '}
          <strong>{web3.utils.fromWei(this.state.balance, 'ether')} ether</strong>.
        </p>

        <hr />
        <form onSubmit={this.enterLottery}>
          <h4>Want to try your luck?</h4>
          <label htmlFor="entry-fee">Amount of Ether to use</label>
          <br />
          <input
            type="text"
            value={this.state.value}
            onChange={event => this.setState({ value: event.target.value })}
          />
          <button>Enter</button>
        </form>

        {this.state.players.length > 0 && (
          <div>
            <hr />
            <h4>Time to go...</h4>
            <button onClick={this.pickWinner}>Pick a winner</button>
          </div>
        )}

        <hr />
        <h4 className="status">{this.state.message}</h4>
      </div>
    );
  }
}

export default App;
