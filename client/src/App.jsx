import './App.css';
import { useState, useEffect } from 'react';
import { useConnect, useAccount, useDisconnect } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import axios from "axios";
import Addname from './componets/AddName';
import Transactions from './componets/Transcations';
import Balance from './componets/Balance';
import SummaryOfUser from './componets/SummaryOfUser'; 
import RequestAndPay from './componets/RequestAndPay';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';


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
  
<div className=" w-screen h-screen bg-black">


<Layout className='bg-black'>
       
<div className='flex flex-col p-10'>
{
  isConnected ? (

    <div className="flex flex-col">
    <div className='flex justify-evenly flex-col sm:flex-row gap-1'>
           <Balance dollars={dollars} />
      <SummaryOfUser
      address={address}
                  name={name}
                  balance={balance}
                />
                {
                  !name &&(<Addname/>)
                }
    </div>
    <div
     className=' text-center text-2xl mt-3'>
    <Link to={'/portfolio'} exact activeClassName="active" className="text-white " >
    Check Your <span className='text-blue-500'>Portfolio</span> value
    </Link>
    </div>
   
    <div>
        <RequestAndPay  requests={requests} getNameAndBalance={getUserDetails}/>

    </div>
      <div className='flex'>
<Transactions history={history}/>
      </div>
    </div>

  ):(
    <span className='bg-black text-white text-center text-3xl'>Please connect Wallet</span>
  )
}

</div>
</Layout>
{/**

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
*/}
     
</div>
  </>

  );
}

export default App;


  