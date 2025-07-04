# Crypto-transfer-web3

A full-stack decentralized application (DApp) for transferring Ethereum, built with React (frontend) and Solidity/Hardhat (backend smart contract).

---

## Project Structure

```
crypt_transfer_web3/
│
├── client/           # React frontend (Vite, TailwindCSS)
│
└── smart_contract/   # Hardhat Ethereum smart contract project
```

---

## Features

- **Send Ethereum**: Transfer ETH to any address with a message and keyword.
- **Transaction History**: View all past transactions on the blockchain.
- **Giphy Integration**: Attach a GIF to each transaction using a keyword.
- **MetaMask Integration**: Connect your wallet to interact with the DApp.
- **Modern UI**: Responsive design using TailwindCSS.

---

## Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/yourusername/crypt_transfer_web3.git
cd crypt_transfer_web3
```

---

### 2. Smart Contract Setup (`smart_contract`)

#### Install Dependencies

```sh
cd smart_contract
npm install
```

#### Configure Environment

Create a `.env` file in `smart_contract/`:

```
ALCHEMY_API_URL=YOUR_ALCHEMY_SEPOLIA_URL
PRIVATE_KEY=YOUR_WALLET_PRIVATE_KEY
```

#### Compile Contracts

```sh
npx hardhat compile
```

#### Deploy to Sepolia Testnet

```sh
npx hardhat run scripts/deploy.js --network sepolia
```

---

### 3. Frontend Setup (`client`)

#### Install Dependencies

```sh
cd ../client
npm install
```

#### Configure Environment

Create a `.env` file in `client/`:

```
VITE_GIPHY_API=YOUR_GIPHY_API_KEY
```

#### Update Contract Address

After deploying the contract, update the `contractAddress` in [`src/utils/constants.js`](client/src/utils/constants.js) with your deployed contract address.

#### Start the Frontend

```sh
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Folder Details

### `client/`

- React app (Vite)
- TailwindCSS for styling
- Connects to Ethereum via MetaMask and ethers.js
- Shows transaction history and allows sending ETH

### `smart_contract/`

- Hardhat project for Solidity smart contracts
- Contains `Transactions.sol` contract
- Scripts for deployment and testing

---

## Useful Commands

### Smart Contract

- Compile: `npx hardhat compile`
- Test: `npx hardhat test`
- Deploy: `npx hardhat run scripts/deploy.js --network sepolia`

### Client

- Start dev server: `npm run dev`
- Build for production: `npm run build`

---

## License

MIT

---

## Author

- [Tushar](mailto:tusharkumarshah14394@gmail.com)
