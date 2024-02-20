import './App.css';
import { useState, useEffect } from 'react';
import { useConnect, useAccount, useDisconnect } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import axios from "axios";
import Addname from './componets/AddName';



function App() {

  // state to hold user status
const {address, isConnected} = useAccount()
const {disconnect} = useDisconnect()
const {connect} = useConnect({
  connector: new MetaMaskConnector(),
})

// data from backend
const [name, setName] = useState("");
const [balance, setBalance] = useState("...");
const [dollars, setDollars] = useState("...");
const [history, setHistory] = useState(null);
const [requests, setRequests] = useState({ "1": [0], "0": [] });


// fiunction to reset the data to null
function disconnectAndSetNull() {
  disconnect();
  setName("...");
  setBalance("...");
  setDollars("...");
  setHistory(null);
  setRequests({ "1": [0], "0": [] });
}

// calling the backend to retrive data
async function getUserDetails(){
  const res = await axios.get(`http://localhost:3001/getUserDetails`,{
    params:{userAddress:address},
  })

  const response = res.data;
  console.log(response.requests);
  if(response.name[1]){
    setName(response.name[0])
  }
  setBalance(String(response.balance));
  setDollars(String(response.dollars));
  setHistory(response.history);
  setRequests(response.requests);
}
// change the connnectivity
useEffect(() => {
  if (!isConnected) return;
  getUserDetails()
}, [isConnected]);

  return (
    <>
  
<div className=" w-screen h-screen bg-blue-300">
     <button onClick={()=>{connect()}}>{address ? " welcome": "connect" }</button>
     {
      address && (

        <h1>User address : {address}</h1>
      )
     }
      {name}
     {
      !name &&(
        <Addname/>
      ) 
     }
</div>
  </>

  );
}

export default App;


  