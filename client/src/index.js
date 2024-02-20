import React from 'react';
import ReactDOM from 'react-dom';
import  {BrowserRouter, Routes, Route} from 'react-router-dom'
import './index.css';
import { configureChains, mainnet, WagmiConfig, createClient } from "wagmi";// to get pre build react hooks
import App from './App';
import { publicProvider } from "wagmi/providers/public";
import { polygonMumbai } from '@wagmi/chains';
import reportWebVitals from './reportWebVitals';



const { provider, webSocketProvider } = configureChains(
  [mainnet, polygonMumbai],
  [publicProvider()]
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

ReactDOM.render(
  <BrowserRouter> 
  <React.StrictMode>
    <WagmiConfig client={client}>
   <App/>
    </WagmiConfig>
  </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
