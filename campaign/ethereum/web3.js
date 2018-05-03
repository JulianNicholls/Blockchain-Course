import Web3 from 'web3';

let provider;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  // Running in browser
  provider = window.web3.currentProvider;
} else {
  // Running in Next / Node, or user is not running Metamask
  provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/DpFnlYt9rqqxCDHY6dmr'
  );
}

export default new Web3(provider);
