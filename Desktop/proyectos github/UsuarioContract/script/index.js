//scrip del contrato
module.exports = async function main (callback){
try{
     const accounts = await web3.eth.getAccounts();
     console.log(accounts);

     //referenciando el contrato
     const UserCrud = artifacts.require('UserCrud.sol');
     const usercrud = await UserCrud.deployed();

     //referenciando el segundo contrato
     const UserCrud2 = artifacts.require('UserCrud2.sol');
     const usercrud2 = await UserCrud2.at(usercrud.address);

     //mostando lo que tiene dentro la estructura
     console.log('Usuarios: ', await usercrud.seeUser(0));

     //mostrando el objeto de usuarios
     const users = await usercrud2.listUser();
     console.log('Usersnames: ',users);
 

   callback(0);
}catch(err){
    console.error(err);
    callback(1);

}


}