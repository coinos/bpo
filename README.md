# Bitcoin proxy object

## Installation

    npm i bpo

## Usage

    import bpo from "bpo";

    let bc = bpo({
      host: "localhost",
      port: 18443,
      username: "rpcuser",
      password: "rpcpass",
      network: "regtest",
      wallet: "wallet",
    });

    console.log(await bc.getBlockCount());
