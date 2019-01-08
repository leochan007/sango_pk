var SafeMath = artifacts.require("./SafeMath.sol");
var SangoPKSystem = artifacts.require("./SangoPKSystem.sol");

module.exports = function(deployer, network, accounts) {
  //console.log("deployer:", deployer)
  //deployer.network
  if (network == 'geth_dev') {
    console.log("migrate geth_dev...")
    //deployer.deploy(SafeMath);
    //deployer.link(SafeMath, SangoPKSystem);
    deployer.deploy(SangoPKSystem, 
      {gas:4000000, gasPrice:50 * 10 ** 9, from: "0xda83aee0f49802a331d455f503341a5fdcbde923"});
  } else {
    console.log("migrate others...")
    //deployer.deploy(SafeMath);
    //deployer.link(SafeMath, SangoPKSystem);
    deployer.deploy(SangoPKSystem,
      {gas:5000000, gasPrice:50 * 10 ** 9}).then(function() {
        console.log('SangoPKSystem address:', SangoPKSystem.address);
      });
    
  }
};
