import React from "react";
import { useState, useEffect } from "react";

function PortfolioValue({ tokens, nativeValue }) {
  const [totalValue, setTotalValue] = useState(0);


  useEffect(() => {
    let val = 0;
    for (let i = 0; i < tokens.length; i++) {
      val = val + Number(tokens[i].val);
    }
    val = val + Number(nativeValue);

    setTotalValue(val.toFixed(2));
  }, [nativeValue, tokens]);

  return (
    <div className="bg-white px-4 py-4 rounded-sm shadow-xl">
      <h1 className="text-xl font-medium">Portfolio Total Value</h1>
      <p>Total Balance:
        <span className="font-bold text-3xl"> ${totalValue}</span>
      </p>
    </div>
  );
}

export default PortfolioValue;