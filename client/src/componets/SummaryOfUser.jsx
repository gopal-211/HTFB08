import React from 'react'
import {UserOutlined} from '@ant-design/icons'
import Home from './AddName';


const SummaryOfUser = ({address, name , balance}) => {
  return (
    <div title="Account Details" className='w-full bg-white max-w-[500px]'>
    <div className='text-center p-3 font-medium'>Account Details</div>
    <hr />
      <div className='flex justify-center items-center w-full gap-6 h-auto ml-[-25px] mt-4 '>
        <UserOutlined style={{ color: "#767676", fontSize: "25px" }} className='sm:flex hidden'/>
        <div>
          <div className="font-bold text-3xl text-gray-700"> {name} </div>
          <div className="text-gray-600 text-xl font-semibold">
            {" "}
            Address: {address?.slice(0, 4)}...{address?.slice(38)}
          </div>
      <div className="flex flex-col  font-semibold text-2xl">{balance} Matic</div>
        </div>
      </div>
     
      { name==='...' &&(
        <Home/>
      )}
    </div>

  )
}

export default SummaryOfUser;


