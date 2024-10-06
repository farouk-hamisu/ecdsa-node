import { useState } from "react";
import server from "./server";
import {secp256k1} from "ethereum-cryptography/secp256k1"; 
import {keccak256} from "ethereum-cryptography/keccak"; 
import {utf8ToBytes,toHex} from "ethereum-cryptography/utils"; 
import {JSONStringify} from "json-with-bigint"; 

function Transfer({ address, setBalance , privateKey}) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();
	 const userMessage = {
		sender: address, 
		amount: parseInt(sendAmount), 
		recipient, 
	 }
	 const signature = secp256k1.sign(hashMessage(JSON.stringify(userMessage)), privateKey); 
	try {
      const {
        data: { balance },
      } = await server.post(`send`, {
		  message: userMessage, 
		  signature: JSONStringify(signature)
		});
      setBalance(balance);
    } catch (ex) {
		console.log(ex); 
      //alert(ex.response.data.message);
    }
  }
  const hashMessage = (message)=>{
	 return keccak256(utf8ToBytes(message)); 
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
