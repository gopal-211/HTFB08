require("@nomicfoundation/hardhat-toolbox");
require('@nomiclabs/hardhat-etherscan')
/** @type import('hardhat/config').HardhatUserConfig */
const key = '8d5dc68f333ed9ca6b8482e78d21a69a1f50d861b839dbbddee0d3b5e49c8897'
module.exports = {
  solidity: "0.8.9",
  networks:{
    mumbai:{
      url:"https://polygon-mumbai.g.alchemy.com/v2/O4DCybOmylKsCBfBLR5A54dggdgBHj0O",
      accounts: [key]
    }
  },
  etherscan: {
    apiKey:"BI2PR6NZ8TJ2EQT5XRH2B7BKZ4RWCSGSZQ"
  }
};


// polygon scan api key : BI2PR6NZ8TJ2EQT5XRH2B7BKZ4RWCSGSZQ