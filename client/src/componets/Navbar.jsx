import React from 'react'
import '../App.css'
import { NavLink} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Layout} from 'antd';
import { useConnect, useAccount, useDisconnect } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import axios from "axios";
const {Header} = Layout


const Navbar = () => {
    
    // state to hold user status
const {address, isConnected} = useAccount()
const {disconnect} = useDisconnect()
const {connect} = useConnect({
  connector: new MetaMaskConnector(),
})

// data from backend
const [name, setName] = useState("...");
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
  // getUserDetails()
}, [isConnected]);
  return (
    <Header className="bg-black flex  justify-between items-center shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
          
    <h1 className='font-bold text-5xl text-white flex items-center pb-2 pr-10'><NavLink to={'/'}>Web3<span className='text-blue-700'>Pay</span></NavLink></h1>
    {isConnected &&(

     <div className=' hidden sm:flex gap-8 text-lg font-semibold'>
       <div
       >
       <NavLink to={'/'} exact activeClassName="active" className="text-white " >
       
         <span>Summary</span>
       </NavLink>
       </div>
      
       
     </div>
   

    )}

    {isConnected ?(

   <button  onClick={disconnectAndSetNull}className='text-white bg-blue-600 px-3'>Disconnect</button>
    ):(

   <button  type={"primary"} onClick={()=>{
     connect()
   }}className='text-white bg-blue-600 px-3'>Connect Wallet</button>
    )}
 </Header>
  )
}

export default Navbar