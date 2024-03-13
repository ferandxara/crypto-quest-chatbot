require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { NlpManager } = require('node-nlp');
const { MongoClient } = require('mongodb');
const { ethers } = require('ethers');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const manager = new NlpManager({ languages: ['en'], nlu: { log: true } });
const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

// Example Smart Contract ABI and address (Assuming a simple NFT contract)
const contractABI = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];
const contractAddress = "0xYourContractAddressHere";
const contract = new ethers.Contract(contractAddress, contractABI, provider);

let gameStates = {};

async function initializeGame() {
  await client.connect();
  const db = client.db("crypto_quest");
  const collections = {
    players: db.collection("players"),
    quests: db.collection("quests"),
  };

  // Load or train your NLP model here
  // For simplicity, we're skipping this part. Assume manager is ready to use.
  
  return collections;
}

const collections = await initializeGame();

io.on('connection', (socket) => {
  console.log('A player has connected.');
  const sessionId = socket.id;
  gameStates[sessionId] = { inventory: [], currentQuest: null };

  socket.on('message', async (text) => {
    const response = await manager.process('en', text);
    let gameResponse = "Your adventure awaits..."; // Default response

    if (response.intent === 'CheckInventory') {
      gameResponse = `You have: ${gameStates[sessionId].inventory.join(', ') || "nothing"}.`;
    } else if (response.intent === 'StartQuest') {
      gameResponse = await startQuest(sessionId, response.entities);
    }

    socket.emit('reply', { message: gameResponse });
  });
});

async function startQuest(sessionId, entities) {
  const player = await collections.players.findOne({ sessionId });

  if (!player) {
    return "Please register before starting a quest.";
  }

  // Assuming the player must own at least one NFT to start the quest
  const nftBalance = await contract.balanceOf(player.walletAddress);
  if (nftBalance.toNumber() > 0) {
    gameStates[sessionId].currentQuest = "Find the Sacred Artifact"; // Example quest
    return "Quest started: Find the Sacred Artifact!";
  } else {
    return "You need to own at least one NFT to start this quest.";
  }
}

server.listen(3000, () => {
  console.log('Crypto Quest Chatbot running on http://localhost:3000');
});
