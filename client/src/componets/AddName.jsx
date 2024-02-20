
import { useState } from 'react';
import { ethers } from 'ethers';
import { useEffect } from 'react';
import ABI from '../Web3pay.json'

import { useConnect, useAccount, useDisconnect } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";




export default function Addname() {

    const {address, isConnected} = useAccount()
const {disconnect} = useDisconnect()
  const [name, setName] = useState('');
  const [transactionHash, setTransactionHash] = useState('');
  const [state, setState] = useState({
    provider:null,
    signer:null,
    contract:null 
})
const [account, setAccount] = useState("");
const [userName, setUserName] = useState("...");
// const {connect} = useConnect({
//     connector: new MetaMaskConnector(),
//   })
  

  const template= async()=>{
    const contractAddress="0x1DD469e6839F424F47BDAAeCed31D71a36B05905";
    const contractABI = ABI;
    
     
      try {
        const {ethereum} = window;
        const account = await ethereum.request({
          method:"eth_requestAccounts"
        })
        window.ethereum.on("accountsChanged",()=>{
          window.location.reload()
        })
        setAccount(account)
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        )
        console.log(contract)
        setState({provider,signer,contract})
      } catch (error) {
        console.log(error)
      }
    }
    // window.ethereum.on("accountsChanged",()=>{
    //   window.location.reload()
    // })
  async function addName() {
    try {
      
      const tx = await state.contract.setName(name);
      await tx.wait();

      setTransactionHash(tx.hash);
      
    } catch (error) {
      console.error('Error adding name:', error);
    }
  }



  async function checkName() {
    try {

      const result = await state.contract.getMyName(account);
      console.log(result)
      setUserName(result.name);
      
    } catch (error) {
      console.error('Error checking name:', error);
      
      
    }
  }

  useEffect(()=>{
    
      
      template()
      checkName()
    //   getNameAndBalance()
  },[])

  return (


    <div className="max-w-md mx-auto p-6 bg-white rounded-lg my-auto shadow-md text-black">
      <h1 className=" mb-4 text-xl font-semibold text-black">Add Name to Wallet Address</h1>
      <input
        type="text"
        placeholder="Wallet Address"
        value={account}
       
        className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
      />
      <input
        type="text"
        placeholder="Name"
        value={name}
        contentEditable={false}
        onChange={(e) => setName(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
      />
      
      
      <button
        onClick={addName}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Name
      </button>
      {transactionHash && (
        <p className="mt-4">
          Transaction Hash:{' '}
          <a href={`https://etherscan.io/tx/${transactionHash}`} className="text-blue-500">
            Transaction
          </a>
        </p>
      )}
    </div>



  );
}