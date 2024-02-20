import React from "react";
import {Input } from '@web3uikit/core'

function WalletInputs({chain, wallet, setChain, setWallet}) {
  return (
    <>
        
    <div>
      
      <div >
        <Input
          id="Wallet"
          label="Wallet Address"
         
          value={wallet}
          style={{height: "50px"}}
          onChange={(e) => setWallet(e.target.value)}
        />
       
      </div>
    </div>
    </>
  );
}

export default WalletInputs;