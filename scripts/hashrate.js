const HDWalletProvider = require("truffle-hdwallet-provider");
const web3 = require("web3");
require('dotenv').config();

const MNEMONIC = process.env.MNEMONIC;
const NODE_API_KEY = process.env.INFURA_KEY || process.env.ALCHEMY_KEY;
const isInfura = !!process.env.INFURA_KEY;
const FACTORY_CONTRACT_ADDRESS = process.env.FACTORY_CONTRACT_ADDRESS;
const NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS;
const OWNER_ADDRESS = process.env.OWNER_ADDRESS;
const NETWORK = process.env.NETWORK;

if (!MNEMONIC || !NODE_API_KEY || !OWNER_ADDRESS || !NETWORK) {
    console.error(
      "Please set a mnemonic, Alchemy/Infura key, owner, network, and contract address."
    );
    return;
}

const GET_HASH_ABI=[{
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "hashRate",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }];

  async function getHashRate(id){
    const network =NETWORK === "mainnet" || NETWORK === "live" ? "mainnet" : "rinkeby";
    const provider = new HDWalletProvider(
        MNEMONIC,
        isInfura
          ? "https://" + network + ".infura.io/v3/" + NODE_API_KEY
          : "https://eth-" + network + ".alchemyapi.io/v2/" + NODE_API_KEY
    );
    const web3Instance = new web3(provider);
    const nftContract=new web3Instance.eth.Contract(
        GET_HASH_ABI,
        NFT_CONTRACT_ADDRESS,
        { gasLimit: "1000000" }
    );
    const result=await nftContract.methods.hashRate(id).call();
    return result;
  }

  async function main(){
    return getHashRate(2)
  }


  main().then(console.log).catch(x=>console.log("something wrong"));

