import Web3 from 'web3';

var web3Provider = window.web3 ? window.web3.currentProvider : null;

const web3 = web3Provider
  ? new Web3(web3Provider)
  : new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));

console.log(web3.eth.accounts);

web3.eth.defaultAccount = web3.eth.accounts[0];

export default web3;
