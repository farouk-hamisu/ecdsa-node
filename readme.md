# Simple Crypto Transfer Platform

This is a simple fullstack project for transferring cryptocurrency between wallets. The platform uses cryptographic signatures and public key recovery to authorize and verify transactions. **Please note** that the project uses mock data and is intended for learning purposes only.

## Features

- Generate a new wallet (private and public keys).
- Sign messages using private keys.
- Recover public keys from signed transactions.
- Transfer cryptocurrency between wallets.

## How It Works

1. **Generate Wallet**: The application generates a private and public key pair which is used for signing and verifying transactions.
2. **Signing Transactions**: When transferring funds, a transaction is signed with the sender's private key to ensure authenticity.
3. **Public Key Recovery**: The recipient can recover the sender’s public key from the transaction to verify the sender's identity.
4. **Transfer Funds**: Users can transfer cryptocurrency from one wallet to another.

## Getting Started

To get the project up and running on your local machine, follow these steps.

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v14 or above)
- npm (Node package manager)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/farouk-hamisu/ecdsa-node.git
    cd ecdsa-node.git
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Start the server:
    ```bash
    npm start
    ```

### Usage

1. Start the application on your local machine by running the server.
2. The `wallet.txt` file contains a pre-generated private and public key. You can use this wallet to try out transferring money between wallets.
3. Once the server is running, you can make POST requests to the `/send` endpoint to transfer cryptocurrency between wallets. An example transaction looks like this:

    ```json
    {
        "sender": "PUBLIC_KEY_OF_SENDER",
        "recipient": "PUBLIC_KEY_OF_RECIPIENT",
        "amount": 100,
        "signature": "SIGNATURE_OF_THE_TRANSACTION"
    }
    ```

### Try it Out!

To try out the project, open the `wallet.txt` file. It contains a pre-generated private and public key you can use for signing and verifying transactions. Use the provided private key to sign your transaction and transfer money between wallets.

Additionally, you can generate new private and public key pairs by running the `generate.js` file located in the `server` folder:

```bash
node server/generate.js

