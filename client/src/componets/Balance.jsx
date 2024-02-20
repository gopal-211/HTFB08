import React from "react";


function Balance({dollars}) {
  return (
    <div title="Current Balance"  className='w-full rounded-2xl bg-white max-w-[500px]'>
    <div className='text-center p-3 font-medium'>Current Balance</div>
    <hr />
      <div className="flex p-4 justify-center flex-col">
        <div className="text-7xl font-bold"><h1>${dollars}</h1></div>
        <div className="text-start mt-2 font-semibold text-2xl">Available</div>
      </div>
      
    </div>
  );
}

export default Balance;