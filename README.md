# trxwallet

> Offline wallet for TRON protocol based on trxplorer.io API : https://api.trxplorer.io

## Features

TRXWallet is a javascript wallet for the TRON blockchain protocol. The main idea is to always keep your TRON private key safe and always offline. You can create a single or multiple wallets using a password that will be used to encrypt you private key and to sign your transactions (sending TRX, voting, freezing/unfreezing TRX). Your private key is never revealed by the application.

Implemented features:

- Create a new wallet 
- Import an existing TRON account into a new wallet
- Live account informations (TRX balance, Bandwidth, Tron power) 
- List of account: transactions, tokens, vote history, freeze/unfreeze history
- Send TRX or token to another account
- Vote for super representative
- Freeze/Unfreeze
- Apply to become representative/delegate
- Transaction signature system that is independant from the application and can be invoked by a third party application (see chrome-extension https://github.com/tronwallet/chrome-extension)
- Extensible app: the application can be used as a component and embedded into another app . TRXWallet is currently used into a chrome-extension version, and also in a desktop version of the application (comming soon)

Feature being implemented:

- Participate in asset
- Create a new asset
- Withdraw allowance
- Improve UI/design

## Run/Build Setup

``` bash
# install dependencies
yarn install

# serve with hot reload at localhost:7070
yarn run dev

# build for production with minification
yarn run build
```

