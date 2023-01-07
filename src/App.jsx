import { detectConcordiumProvider } from "@concordium/browser-wallet-api-helpers";
import { AccountTransactionType, CcdAmount } from "@concordium/web-sdk";

import { useState } from "react";
import "./App.css";

function App() {
  const [address, setAddress] = useState(null);
  const [client, setClient] = useState(null);
  const [text, setText] = useState(null);

  const rawMouleSchema = "";
  const moduleReference = "";

  const connectWallet = async () => {
    const client = await detectConcordiumProvider();
    setAddress(await client.connect());

    client
      .sendTransaction(
        address,
        AccountTransactionType.InitContract,
        {
          amount: CcdAmount(0n),
          moduleRef: moduleReference,
          initName: "demo",
          maxContractExecutionEnergy: 3000n,
        },
        {
          text,
        },
        rawMouleSchema
      )
      .then((txHash) => console.log(txHash))
      .catch((err) => console.lof(err));
  };

  const sendTx = async () => {
    console.log(text);
  };

  return (
    <div className="App">
      <button onClick={() => connectWallet()}>Connect</button>
      {address && <p>{address}</p>}

      <input
        type="text"
        placeholder="enter a text"
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={() => sendTx()}>send</button>
    </div>
  );
}

export default App;
