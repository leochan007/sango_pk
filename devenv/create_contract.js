var fs=require('fs');
var Web3 = require('web3');

var arguments = process.argv.splice(2);

config_file =__dirname + '/create.json'

if (arguments.length > 0) {
    config_file = arguments[0];
}

console.log(config_file);

config = JSON.parse(fs.readFileSync(config_file, 'utf-8'));

web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider(config.provider_url));
//
abi_txt = fs.readFileSync(config.abi_file, 'utf-8');
abi_data = JSON.parse(abi_txt);

bytecode_data = "0x" + fs.readFileSync(config.bytecode_file, 'utf-8');

contract = web3.eth.contract(abi_data);

var contract_creation = {
    "from" : config.owner_addr,
    "gas" : config.gas,
    "gasPrice": config.gasPrice,
    "data" : bytecode_data
};

var tx = web3.eth.sendTransaction(contract_creation);

console.log("tx:" + tx);
