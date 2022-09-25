const { deployProxy } = require('@openzeppelin/truffle-upgrades');
const UsersCrud = artifacts.require('UserCrud.sol');

module.exports = async function(deployer, network, accounts){
  await deployProxy(UsersCrud, [accounts[0]], {deployer, initializer: 'initialize'});
};