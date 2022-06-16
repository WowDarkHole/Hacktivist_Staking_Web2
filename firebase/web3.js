import Web3 from 'web3';
import { ethers } from "ethers";

const contractAbi = require('../abi.json')
const contractAddress = "0x6779cc532c543938eaff11318ad0000fe8d82a0c";

export const getHolders = async (address) => {

  const { ethereum } = window;
  let holdStatus;
  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    const nftContract = new ethers.Contract(
      contractAddress,
      contractAbi,
      signer
    );

    console.log("Initialize payment");
    holdStatus = await nftContract.walletOfOwner(address);
    console.log("Token Amount:", holdStatus);
  }
  return holdStatus;
}
