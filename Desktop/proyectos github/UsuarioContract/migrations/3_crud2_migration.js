//migracion de UserCrud2

const { upgradeProxy } = require('@openzeppelin/truffle-upgrades');
const UserCrud = artifacts.require('UserCrud.sol');
const UserCrud2 = artifacts.require('UserCrud2.sol');

module.exports = async function(deployer){
    const alreadyDeployed = await UserCrud.deployed();
    await upgradeProxy(alreadyDeployed.address, UserCrud2, {deployer});
};