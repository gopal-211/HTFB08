import React from "react";
import axios from "axios";
import { Table } from "@web3uikit/core";
import {Reload} from '@web3uikit/icons'
function NativeTokens({
  wallet,
  chain,
  nativeBalance,
  setNativeBalance,
  nativeValue,
  setNativeValue,
}) 
{
  async function getNativeBalance() {
    const res = await axios.get("http://localhost:3001/nativeBalance", {
      params: {
        userAddress: wallet
      },
    });
    const response = res.data;
    console.log(response.requests);
    console.log(response);
   
      setNativeBalance(String(response.balance));
      setNativeValue(String(response.dollars));
    }
  

  return (
    <>
    <div  className="flex gap-1 ">Native Balance <Reload className=" cursor-pointer" onClick={wallet &&  getNativeBalance}/></div>
      {(nativeBalance >0 && nativeValue >0) && 
      <Table
      pageSize={1}
      noPagination={true}
      style={{width:"900px"}}
      columnsConfig="300px 300px 250px"
      data={[["Native", nativeBalance, `$${nativeValue}`]]}
      header={[
        <span>Currency</span>,
        <span>Balance</span>,
        <span>Value</span>,
      ]}
    />
      }
    </>
  );
}

export default NativeTokens;
