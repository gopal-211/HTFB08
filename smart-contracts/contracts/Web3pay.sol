
// SPDX-License-Identifier: MIT

// c_hanged version from 8.24 to 8.9 
pragma solidity ^0.8.9;

contract Web3Pay {

    address public owner; // owner of the contract address


    constructor() {
        owner = msg.sender;  // owner of the contract
    }

    struct Request {      // the person who requests amount 
        address requester;
        uint amount;
        string message;
        string name;
    }

    struct Transaction { // the transaction - sender and reciver 
        string action;  
        uint amount; 
        string message;
        address requesterAddress;
        string requesterName;
    }

    struct UserName {   // giving a user name to each address
        string name;
        bool hasName;
    }

}