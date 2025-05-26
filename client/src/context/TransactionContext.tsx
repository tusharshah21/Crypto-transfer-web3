import React, { useEffect, useState, createContext } from "react";
import type { ReactNode } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

interface TransactionContextProps {
  connectWallet: () => Promise<void>;
}

export const TransactionContext = createContext<TransactionContextProps | undefined>(undefined);

declare global {
  interface Window {
    ethereum?: any;
  }
}

const { ethereum } = window;

const getEthereumContract = async () => {
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const transactionContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
    );
    
    // return transactionContract;
    console.log({ provider, signer, transactionContract });
}


export const TransactionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [connectedAccount, setconnectedAccount] = useState<string>("");
    const checkIfWalletIsConnected = async () => {
        if(!ethereum) return alert("Please install MetaMask");
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        console.log("Connected accounts:", accounts);
    }

    const connectWallet = async () => {
        try{
            if(!ethereum) return alert("Please install MetaMask");
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            setconnectedAccount(accounts[0]);
            console.log("Connected accounts:", accounts);
        }catch (error) {
            console.error("Error connecting wallet:", error);
            throw new Error("No ethereum object.");
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    },[]);

    return (
        <TransactionContext.Provider value={{ connectWallet }}>
            {children}
        </TransactionContext.Provider>
    );
}