import React from 'react';
import './App.css';

import web3 from './web3';
import lottery from './lottery';

class App extends React.Component {
  state = {
    manager: '',
    players: [],
    balance: ''
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState(() => ({ manager, players, balance }));
  }

  render() {
    web3.eth.getAccounts().then(console.log);

    return (
      <div className="container">
        <h2>Lottery Contract</h2>
        <h4>
          This lottery is managed by {this.state.manager}
          <br />
          There are currently {this.state.players.length} players competing to win{' '}
          {web3.utils.fromWei(this.state.balance, 'ether')} ether.
        </h4>
      </div>
    );
  }
}

export default App;
