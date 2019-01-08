const BigNumber = require('bignumber.js');
const SangoPKSystem = artifacts.require('SangoPKSystem')

const cc = require('./constants')

let token
let wallet

// accounts[0] = Contract Owner
// accounts[1] = test account
// accounts[2] = test account
// accounts[5] = WALLET_ACCOUNT

contract('SangoPKSystem', function (accounts) {
  beforeEach(async () => {
    sango = await SangoPKSystem.new({from: accounts[0]})
    console.log(sango.address)
  })

  it('creation: check owner', async () => {
    owner = await sango.owner.call()
    console.log("owner:", owner)
    assert.strictEqual(owner, accounts[0], "owner is wrong!")
  })

  it('creation: test correct setting of basic information', async () => {
  })
  
})