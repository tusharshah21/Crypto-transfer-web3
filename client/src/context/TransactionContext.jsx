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
  console.log({
    provider,
    signer,
    transactionContract,
  });
};

export const TransactionsProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });
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
    }catch (error) {
      console.error("Error sending transaction:", error);
      throw new Error("Transaction failed.");
    }
  }

  return (
    <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};
