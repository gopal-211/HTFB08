import React from 'react'

import './App.css';
import { useState, useEffect } from 'react';
import WalletInputs from './componets/WalletInput';
import NativeTokens from './componets/Nativetoken';
import Nfts from './componets/Nfts';
import Tokens from './componets/Tokens';
import TransferHistory from './componets/TransferHistory';
import PortfolioValue from './componets/PortfolioValue';
import { Layout,Button } from 'antd';
import { useConnect, useAccount, useDisconnect } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import axios from "axios";
const {Header,Content} = Layout



function Portfolio() {

  const [wallet, setWallet] = useState("");
  const [chain, setChain] = useState("0x1");
  const [nativeBalance, setNativeBalance] = useState(0);
  const [nativeValue, setNativeValue] = useState(0);
  const [tokens, setTokens] = useState([]);
  const [nfts, setNfts] = useState([]);
  const [filteredNfts, setFilteredNfts] = useState([]);
  const [transfers, setTransfers] = useState([]);


const {address, isConnected} = useAccount()
const {disconnect} = useDisconnect()
const {connect} = useConnect({
  connector: new MetaMaskConnector(),
})

const [name, setName] = useState("...");
const [balance, setBalance] = useState("...");
const [dollars, setDollars] = useState("...");
const [history, setHistory] = useState(null);
const [requests, setRequests] = useState({ "1": [0], "0": [] });



function disconnectAndSetNull() {
  disconnect();
  setName("...");
  setBalance("...");
  setDollars("...");
  setHistory(null);
  setRequests({ "1": [0], "0": [] });
}

async function getNameAndBalance(){
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

useEffect(() => {
  if (!isConnected) return;
  getNameAndBalance();
}, [isConnected]);

  return (<>
  
<div className=" w-screen h-screen bg-slate-100">
        <h1 className=' mb-6 text-center font-bold text-4xl'>Check your wallet <span className='text-blue-400'>
          Worth
        </span></h1>
        <hr />
        <div className="mt-3 flex flex-col justify-center items-center">
      <WalletInputs 
      chain={chain}
      setChain={setChain}
      wallet={wallet}
      setWallet={setWallet}/>
      <div className='flex flex-col p-10'>
      <PortfolioValue 
      nativeValue={nativeValue}
        tokens={tokens}
      />
      </div>
     <NativeTokens
     wallet={wallet}
     chain={chain}
     nativeBalance={nativeBalance}
     setNativeBalance={setNativeBalance}
     nativeValue={nativeValue}
     setNativeValue={setNativeValue}
     />
    <tokens
    wallet={wallet} 
    chain={chain}
    tokens={tokens}
    setTokens={setTokens}
     />
    <TransferHistory 
    chain={chain} 
    wallet={wallet}
    transfers={transfers}
    setTransfers={setTransfers}
    />
      <Nfts 
      wallet={wallet} 
      chain={chain}
      nfts={nfts}
      setNfts={setNfts}
      filteredNfts={filteredNfts}
      setFilteredNfts={setFilteredNfts}
      />
      
    </div>
</div>
  </>

  );
}

export default Portfolio;