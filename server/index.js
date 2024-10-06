const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const {hexToBytes} = require("ethereum-cryptography/utils"); 
const {utf8ToBytes} = require("ethereum-cryptography/utils"); 
const {keccak256} = require("ethereum-cryptography/keccak"); 
const {secp256k1} = require("ethereum-cryptography/secp256k1"); 
const {toHex} = require('ethereum-cryptography/utils'); 

app.use(cors());
app.use(express.json());

const balances = {
"025563393776f7383bcd560f5322c443a6910bc5782589f5513adbc143e5c00b0b"
: 100,
"032e33b85d27a9f24dae256ae341c7bf85447831fd8961851175a93a3c3f128fc9"
  : 50,
"02c3d3fbffc85f99e39592869c1f2cc37052f137ed6d6c60017095109d99f28a3f": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", async (req, res) => {
  const {message, signature} = req.body; 
  const {JSONParse} = await import ("json-with-bigint"); 
  const parsedSignature = JSONParse(signature); 
  const {sender, amount, recipient} = message; 
  const isValid = secp256k1.verify(parsedSignature, hashMessage(message), sender); 
  if(!isValid) {
	 response.status(501).send("invalid private key"); 
  }
  console.log(parsedSignature); 
    if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
const hashMessage = (message)=>{
  const messageString = JSON.stringify(message); 
  const messageBytes = utf8ToBytes(messageString); 
  return keccak256(messageBytes); 
}

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
