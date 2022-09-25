const { expect } = require('chai');
const { expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const { inTransaction } = require('@openzeppelin/test-helpers/src/expectEvent');
const { assertion } = require('@openzeppelin/test-helpers/src/expectRevert');
const UserCrud = artifacts.require('UserCrud.sol');

//starck test
contract('UserCrud',([owner,other]) => {
    let user = [];
    beforeEach(async () => {
        this.usercrud = await UserCrud.new({from: owner});
    });

  //  inicinado los test
    it('Entering a user', async() => {
       user[0] = await this.usercrud.createUser('george','pgeorgealberto@gmail.com', {from: owner});
       expect(await this.usercrud.seeUser(0),user[0],'Should expect string!');

    });

    //agregando otro usuario
    it('Entering another user', async() => {
        user[1] = await this.usercrud.createUser('humberto','humberto@gmail.com', {from: owner});
       expect(await this.usercrud.seeUser(0),user[1],'Should expect string!');
    });

    //actualizando el usuario
    it('Should upgrade user data', async() => {
        user[0] = await this.usercrud.createUser('george','pgeorgealberto@gmail.com', {from: owner});
        let result = await this.usercrud.upgrateUser(0,'alberto', {from: owner});
        expect(user[0],result,'Should expect string!');
    });
});


