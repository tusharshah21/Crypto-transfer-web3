import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
  return transactionContract;
};

export const TransactionsProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  }

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask!");
      const accounts = await ethereum.request({
        method: "eth_accounts",
      });
      console.log("Connected accounts:", accounts);
      if (accounts.length) {
        console.log("Wallet is connected:", accounts[0]);
        //get all transactions
      } else {
        console.log("No accounts found. Please connect your wallet.");
        //connect wallet
      }
    } catch (error) {}
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    getEthereumContract();
  }, []);

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask!");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected account:", accounts[0]);
    } catch (error) {
      console.error("Error connecting wallet:", error);
      throw new Error("No Ethereum object.");
    }
  };
  const sendTransaction= async () => {
    try{
      if(!ethereum) return alert("Please install MetaMask!");
      const { addressTo, amount, keyword, message } = formData;
      const transactionContract = getEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount);

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [{
          from: currentAccount,
          to: addressTo,
          gas: "0x5208", // 21000 Gwei
          // Convert amount to Wei and then to Hex
          value: parsedAmount._hex,
        }],
      });

      const transactionHash=await transactionContract.addToBlockchain(
        addressTo,
        parsedAmount,
        keyword,
        message
      );
      setIsLoading(true);
      console.log(`Loading - ${transactionHash.hash}`);
      await transactionHash.wait();
      console.log(`Success - ${transactionHash.hash}`);
      setIsLoading(false);

      const transactionCount=await transactionContract.getTransactionCount();
      setTransactionCount(transactionCount.toNumber());
      window.location.reload();
    }catch (error) {
      console.error("Error sending transaction:", error);
      throw new Error("Transaction failed.");
    }
  }

  return (
    <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, isLoading, setFormData, handleChange, sendTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};
