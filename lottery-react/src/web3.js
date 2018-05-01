import Web3 from 'web3';

export const mmProvider = window.web3.currentProvider;
const web3 = new Web3(mmProvider);

export default web3;
