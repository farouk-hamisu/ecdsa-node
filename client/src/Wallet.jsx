import server from "./server";
import {secp256k1} from "ethereum-cryptography/secp256k1"; 
import {toHex, utf8ToBytes} from "ethereum-cryptography/utils"; 
import {Buffer} from "buffer"; 

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
  async function onChange(evt) {
	 const currentPrivateKey = evt.target.value; 
	 setPrivateKey(currentPrivateKey); 
	 //implement signature, send only signature to the server
	 const address = toHex(secp256k1.getPublicKey(Buffer.from(currentPrivateKey.toString(), "hex"))); 
	 console.log("checking private key"); 
	 console.log(currentPrivateKey); 
	 console.log("checking address"); 
	 console.log(address); 
    if (address) {
		setAddress(address); 
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Enter your private key
        <input placeholder="Type a private key, for example: 0x1" value={privateKey} onChange={onChange}></input>
      </label>
		<div> private key : {privateKey.slice(0, 10)}... </div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
