// SPDX-License-Identifier: MIT

// c_hanged version from 8.24 to 8.9
pragma solidity ^0.8.9;

contract Web3Pay {
    address public owner; // owner of the contract address

    constructor() {
        owner = msg.sender; // owner of the contract
    }

    struct Request {
        // the person who requests amount
        address requester;
        uint amount;
        string message;
        string name;
    }

    struct Transaction {
        // the transaction - sender and reciver
        string action;
        uint amount;
        string message;
        address requesterAddress;
        string requesterName;
    }

    struct UserName {
        // giving a user name to each address
        string name;
        bool hasName;
    }
    //create mapping for the users, requests, history

    mapping(address => UserName) names; // mapping for names
    mapping(address => Request[]) requests; // mapping for requetss

    mapping(address => Transaction[]) history; // mapping history with adrress


    // function to set username
    function setName(string memory _name) public {
        UserName storage newUserName = names[msg.sender]; 
        newUserName.name = _name;
        newUserName.hasName = true;
    }

        // function to crete a request from on address to another adderss with name refrence
     function createRequest(address user, uint _amount, string memory _message) public {
        Request memory newRequest;
        newRequest.requester = msg.sender;
        newRequest.amount = _amount;
        newRequest.message = _message;
        if (names[msg.sender].hasName) {
            newRequest.name = names[msg.sender].name;
        }
        requests[user].push(newRequest);
    }


}
