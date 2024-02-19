// SPDX-License-Identifier: MIT

// c_hanged version from 8.24 to 8.9

// 
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
    //  adding Histoy 
    function addHistory(address sender, address receiver, uint _amount, string memory _message) private {  // private function get specific user transaction

        Transaction memory newSend;  // get transaction details of sender 
        newSend.action = "Send";
        newSend.amount = _amount;
        newSend.message = _message;
        newSend.requesterAddress = receiver;
        if (names[receiver].hasName) {
            newSend.requesterName = names[receiver].name;
        }
        history[receiver].push(newSend);

        Transaction memory newReceiver; // getting details of recviver
        newReceiver.action  = "Receive";
        newReceiver.amount = _amount;
        newReceiver.message = _message;
        newReceiver.requesterAddress = sender;
        if (names[sender].hasName) {
            newReceiver.requesterName = names[sender].name;
        }
        history[receiver].push(newReceiver);
    }

        // function to get uer history 
     function getUserHistory(address _user) public view returns(Transaction[] memory){
        return history[_user];
    }

    // cerating function to pay a request 
    function payRequest(uint _request) public payable {
        require(_request < requests[msg.sender].length, "no requests like this"); // to check the existence of a transaction
        Request[] storage myRequests = requests[msg.sender];
        Request storage payableRequest = myRequests[_request];

        uint toPay = payableRequest.amount * 1 ether;
        require(msg.value == toPay, "enter correct amount to pay");

        payable(payableRequest.requester).transfer(msg.value);
        addHistory(msg.sender, payableRequest.requester, payableRequest.amount, payableRequest.message); // calling the above function to get details
        myRequests[_request] = myRequests[myRequests.length - 1];  // after paying the amount it will get deleted from the list 
        myRequests.pop();
    }
    
       // function to get the user request for specific address
    function getUserRequests(address _user) public view returns (
        address[] memory,
        uint[] memory,
        string[] memory,
        string[] memory
    ){
        address [] memory addrs = new address[](requests[_user].length);
        uint[] memory amnt = new uint[](requests[_user].length);
        string[] memory msge = new string[](requests[_user].length);
        string[] memory nme = new string[](requests[_user].length);

            // looping to get all required data
        for (uint i = 0; i < requests[_user].length; i++) {      
            Request storage myRequests = requests[_user][i];
            addrs[i] = myRequests.requester;
            amnt[i] = myRequests.amount;
            msge[i] = myRequests.message;
            nme[i] = myRequests.name;
        }

        return (addrs, amnt, msge, nme);
    }
     // function to get user name 
     function getUserName(address _user) public view returns (UserName memory){
        return names[_user];
    }



}
// contract works 