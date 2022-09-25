const {expect}  = require('chai');
const { BN, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const UserCrud2 = artifacts.require('UserCrud2.sol');
const { getContractAddress } = require('@openzeppelin/truffle-upgrades/dist/utils');
const { assertion } = require('@openzeppelin/test-helpers/src/expectRevert');

contract('UserCrud2', ([owner,other]) => {

 let user = []; //guardamos el objeto user
 
 beforeEach(async () => {
    this.usercrud2 = await UserCrud2.new({from: owner});
 });

 //iniciando test ingresando usuario
 it('Entering a user', async() => {
    user[0] = await this.usercrud2.createUser('george','pgeorgealberto@gmail.com', {from: owner});
    expect(await this.usercrud2.seeUser(0),user[0],'Should expect string!');

 });

 //actualizando usuario
 it('Should upgrade user data', async() => {
    user[0] = await this.usercrud2.createUser('george','pgeorgealberto@gmail.com', {from: owner});
    let result = await this.usercrud2.upgrateUser(0,'alberto', {from: owner});
    expect(user[0],result,'Should expect string!');
});

//probando evento contrato creado
it('Should event user created', async () => {
   const receipt = await this.usercrud2.createUser('george','pgeorgealberto@gmail.com', {from: owner});
   expectEvent(receipt,'UserCreate');
});

//probando evento user update
it('Should sent event,user update', async () => {
   user[0] = await this.usercrud2.createUser('george','pgeorgealberto@gmail.com', {from: owner});
   const receipt = await this.usercrud2.upgrateUser(0,'alberto', {from: owner});
   expectEvent(receipt, 'UserUpgrated');
});

//probando dos usuarios no deven tener el mismo gmail
it('Tow user should not have the same gmail', async () => {
    try{
    await this.usercrud2.createUser('george','pgeorgealberto@gmail.com', {from: owner});
    await this.usercrud2.createUser('alejandro', 'pgeorgealberto@gmail.com', {from: owner});
     assert(false);
    }catch(err){
      assert(err);
    }
});

//retornando los usuarios
it('Should getting the user list', async()=> {
   user[0] = await this.usercrud2.createUser('alberto','alberto@gmail.com');
   const listuser = await this.usercrud2.listUser();
   expect(listuser,user,'Dont have the same value!');
});

});