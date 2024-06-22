require("@nomiclabs/hardhat-ethers");
require('dotenv').config();

module.exports = {
  solidity: "0.8.4",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/HR96eG4ojXq62NCoMEo1GOXUOyTTnE4Z",
      accounts: [`0x${process.env.SEPOLIA_PRIVATE_KEY}`]
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};


