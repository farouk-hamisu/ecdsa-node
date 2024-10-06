const {secp256k1} = require("ethereum-cryptography/secp256k1"); 
const {getRandomBytesSync}  = require("ethereum-cryptography/random.js"); 
const {toHex}  = require("ethereum-cryptography/utils"); 
const privateKey = getRandomBytesSync(32); 
const publicKey = secp256k1.getPublicKey(privateKey); 
console.log(`private key:${toHex(privateKey)}`); 
console.log(`public key; ${toHex(publicKey)}`); 
