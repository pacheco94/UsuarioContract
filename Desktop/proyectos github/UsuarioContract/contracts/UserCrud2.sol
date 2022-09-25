//SPDX-License-Identifier: MIT

/**
Esta contrato es actualizado en este contrato agrego los eventos y la funcion de eliminar
y ver el total de usuarios en la lista de user
 */

pragma solidity ^0.8.11;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract UserCrud2 is Initializable{

   uint256 index;
   address private admin;

   struct Users{
    uint id;
    string name;
    string gmail;
   }

   Users[] listuser; // lista de usuarios
   mapping(uint256 => Users) users; //mappin de los usiarios
   
   //declarar eventos aqui
   event UserCreate(uint256,string);
   event UserUpgrated(uint256,string);

   //funcion inicializadora
   function initialize(address _admin) public initializer{
    admin = _admin;
   }

   //funcion constructora para dejar inicializado el contrato
   /// @custom:oz-upgrades-unsafe-allow constructor
   constructor() {
    _disableInitializers();
   }

  //funcion de busqueda dentro de una lista para manipular el array de users
  function Search(uint256 _id) internal view returns(uint256){
    for(uint256 i = 0; i < listuser.length; i++){
         if(listuser[i].id == _id){
            return i;
         }
    }
    revert('Username does not exist');
  }

  //funcion para ingresar a un usuario
  function createUser(string memory _name, string memory _gmail) public {
    for(uint256 i = 0; i < listuser.length; i++){
        require(keccak256(abi.encodePacked(_gmail)) != keccak256(abi.encodePacked(listuser[i].gmail)), 'Username already exist!');
    }
    listuser.push(Users(index, _name, _gmail));
    users[index] = Users(index, _name, _gmail);
    emit UserCreate(index, _name);
    //incrementamos el index para la proxima llamada de la funcion
    index++;
    }

   //funcion para actualizar a un usuario
   function upgrateUser(uint256 _id, string memory newname) public {
    uint256 i = Search(_id);
    listuser[i].name = newname; //actualizamos con el nuevo nombre
    users[i].name = newname; // actualizamos con el nuevo nombre 

    emit UserUpgrated(_id, newname);
   } 

   //funcion para ver a un usuario solo el admin la realilza
   function seeUser(uint _id) public view returns(Users memory){
    //require(msg.sender == admin, 'UserCrud:not admin!');
    uint256 i = Search(_id);
    return users[i];
   }

   //retornamos el array de structura
   function listUser() public view returns(uint[] memory, string[] memory,string[] memory){
     uint256[] memory ids = new uint256[](listuser.length);
     string[] memory names = new string[](listuser.length);
     string[] memory gmails = new string[](listuser.length);

    for(uint256 _index = 0; _index < listuser.length; _index++){
       ids[_index] = listuser[_index].id;
       names[_index] = listuser[_index].name;
       gmails[_index] = listuser[_index].gmail;
    }
    return (ids, names, gmails);
   }
   //escribir aqui funcion de eliminar a un usuario
   function deleteUser(uint256 _id) public {
    //require(msg.sender == admin,'UserCrud2: its not the admin!');
    uint256 i = Search(_id);
    delete users[i];
    delete listuser[i];
   }
}