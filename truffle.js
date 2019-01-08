module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      gas: 4000000,
      gasPrice: 50,
      network_id: "*",
    },
    geth_dev: {
      host: "localhost",
      port: 8545,
      /*provider: function() {
        return new HDWalletProvider(mnemonic, "http://127.0.0.1:8545/");
      },*/
      gas: 4000000,
      network_id: "1111",
    }
  },
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    },
    mocha: {
      useColors: true
    }
};
