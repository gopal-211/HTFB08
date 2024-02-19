// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Web3Pay {

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    struct Request {
        address requester;
        uint amount;
        string message;
        string name;
    }

    struct Transaction {
        string action;  
        uint amount; 
        string message;
        address requesterAddress;
        string requesterName;
    }

    struct UserName {
        string name;
        bool hasName;
    }

    mapping (address => UserName) names; 
    mapping(address => Request[]) requests;  
    mapping(address => Transaction[]) history;

    function setName(string memory _name) public {
        UserName storage newUserName = names[msg.sender];
        newUserName.name = _name;
        newUserName.hasName = true;
    }

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

    function payRequest(uint _request) public payable {
        require(_request < requests[msg.sender].length, "no such request");
        Request[] storage myRequests = requests[msg.sender];
        Request storage payableRequest = myRequests[_request];

        uint toPay = payableRequest.amount * 1 ether;
        require(msg.value == toPay, "pay correct amount");

        payable(payableRequest.requester).transfer(msg.value);
        addHistory(msg.sender, payableRequest.requester, payableRequest.amount, payableRequest.message);
        myRequests[_request] = myRequests[myRequests.length - 1];
        myRequests.pop();
    }

    function addHistory(address sender, address receiver, uint _amount, string memory _message) private {
        Transaction memory newSend;
        newSend.action = "Send";
        newSend.amount = _amount;
        newSend.message = _message;
        newSend.requesterAddress = receiver;
        if (names[receiver].hasName) {
            newSend.requesterName = names[receiver].name;
        }
        history[receiver].push(newSend);

        Transaction memory newReceiver;
        newReceiver.action  = "Receive";
        newReceiver.amount = _amount;
        newReceiver.message = _message;
        newReceiver.requesterAddress = sender;
        if (names[sender].hasName) {
            newReceiver.requesterName = names[sender].name;
        }
        history[receiver].push(newReceiver);
    }

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

        for (uint i = 0; i < requests[_user].length; i++) {
            Request storage myRequests = requests[_user][i];
            addrs[i] = myRequests.requester;
            amnt[i] = myRequests.amount;
            msge[i] = myRequests.message;
            nme[i] = myRequests.name;
        }

        return (addrs, amnt, msge, nme);
    }

    function getUserHistory(address _user) public view returns(Transaction[] memory){
        return history[_user];
    }

    function getUserName(address _user) public view returns (UserName memory){
        return names[_user];
    }
}
