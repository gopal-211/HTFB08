const express = require('express')
const Moralis = require("moralis").default;
const cors = require("cors")
const app = express()
const port = 3001
const ABI = require("./Web3pay.json")

app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello , This is the back end of our application HFB08')
})


function convertArrayToObjects(array) {
    const data = array.map((transactions, i) => ({
      key: (array.length + 1 - i).toString(),
      type: transactions[0],
      amount: transactions[1],
      message: transactions[2],
      address: `${transactions[3].slice(0,4)}...${transactions[3].slice(0,4)}`,
      subject: transactions[4],
    }));
  
    return data.reverse();
  }
  
  app.get("/getUserDetails", async (req, res) => {
    const { userAddress } = req.query;
  
    const response = await Moralis.EvmApi.utils.runContractFunction({
      chain: "0x13881",
      address: "0x1DD469e6839F424F47BDAAeCed31D71a36B05905",
      functionName: "getUserName",
      abi: ABI,
      params: { _user: userAddress },
    });
  
    const ResponseName = response.raw;
  
    const secondResponse = await Moralis.EvmApi.balance.getNativeBalance({
      chain: "0x13881",
      address: userAddress,
    });
  
    const ResponseBalance = (secondResponse.raw.balance / 1e18).toFixed(2);
  
    const thirResponse = await Moralis.EvmApi.token.getTokenPrice({
      address: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
    });
  
    const ResponseDollars = (
      thirResponse.raw.usdPrice * ResponseBalance
    ).toFixed(2);
  
    const fourResponse = await Moralis.EvmApi.utils.runContractFunction({
      chain: "0x13881",
      address: "0x1DD469e6839F424F47BDAAeCed31D71a36B05905",
      functionName: "getUserHistory",
      abi: ABI,
      params: { _user: userAddress },
    });
  
    const ResponseHistory = convertArrayToObjects(fourResponse.raw);
  
  
    const fiveResponse = await Moralis.EvmApi.utils.runContractFunction({
      chain: "0x13881",
      address: "0x1DD469e6839F424F47BDAAeCed31D71a36B05905",
      functionName: "getUserRequests",
      abi: ABI,
      params: { _user: userAddress },
    });
  
    const ResponseRequests = fiveResponse.raw;
  
  
    const jsonResponse = {
      name: ResponseName,
      balance: ResponseBalance,
      dollars: ResponseDollars,
      history: ResponseHistory,
      requests: ResponseRequests,
    };
  
    return res.status(200).json(jsonResponse);
  });

Moralis.start({
    apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjdjYWZjY2QwLTQwN2QtNGUyZS05YjQ1LTA4NGNiYzhjYjg5OCIsIm9yZ0lkIjoiMzc3OTg3IiwidXNlcklkIjoiMzg4NDMzIiwidHlwZUlkIjoiOGQ5ZGUxOTQtYmZkZC00ZDc0LTlkMjgtOWQxNWFlMzIwODQ2IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MDgzNzg4NzIsImV4cCI6NDg2NDEzODg3Mn0.aJYLYBDmLgQAOAQxYLu8jLQ7ZhboQ9qidLNUitXEQ_g",
  }).then(() => {
    app.listen(port, () => {
      console.log(`Listening for API Calls at port ${port || 3001}`);
    });
  });