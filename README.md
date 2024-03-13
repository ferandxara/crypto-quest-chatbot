## Crypto Quest Chatbot
Crypto Quest Chatbot is an interactive game that combines chatbot functionality with blockchain technology. Players can embark on quests, manage inventories, and interact with the game through natural language processed by the NLP Manager. The game integrates with MongoDB for persistent state management and Ethereum blockchain for unique game interactions, such as verifying the ownership of NFTs (Non-Fungible Tokens).

## Features
Chat Interface: Interact with the game through a real-time chat interface.
Natural Language Processing: Understands and responds to player inputs using NLP.
Inventory Management: Players can check and manage their game inventories.
Quest System: Embark on quests and progress through the game narrative.
Blockchain Integration: Verify NFT ownership and interact with smart contracts on the Ethereum blockchain.

Prerequisites:
Node.js
npm or yarn
MongoDB
An Ethereum wallet with testnet or mainnet ETH (for interacting with smart contracts)

## Installation
Clone the repository
git clone <repository-url>
cd crypto-quest-chatbot

Install dependencies
npm install
or if you use yarn:
yarn

Environment Configuration
Create a .env file in the root directory and populate it with the necessary environment variables:
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-address>/test?retryWrites=true&w=majority
RPC_URL=https://<ethereum-network>.infura.io/v3/<project-id>
Replace <username>, <password>, <cluster-address>, <ethereum-network>, and <project-id> with your actual MongoDB credentials and Ethereum network RPC URL.

## Running the Application
or if you use yarn:
yarn start

The server will start, and you can connect to the chatbot interface at http://localhost:3000.

## Usage
Connect to the chatbot via the web interface provided at http://localhost:3000.
Send messages to interact with the chatbot. Try commands like "start quest" or "check inventory" to engage with the game mechanics.
The chatbot will process your input and respond based on the game's logic and your current game state.