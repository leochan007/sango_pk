var Migrations = artifacts.require("./Migrations.sol");

module.exports = function(deployer, network, accounts) {
  if (network == 'geth_dev') {
    console.log("migrate geth_dev...")
    deployer.deploy(Migrations, {from: "0xda83aee0f49802a331d455f503341a5fdcbde923"});
  } else {
    console.log("migrate others...")
    deployer.deploy(Migrations);
    
  }
};
