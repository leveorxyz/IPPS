# IPPS

[![IPPS Demo](https://github.com/leveorxyz/IPPS/blob/main/IPPS-Demo.png)](https://youtu.be/WkEaQCn6oBI)

## Context

IPPS (Inter Planetary Payment System) is a blockchain based payment gateway system to enable centralized banks participate in DeFi movement by tokenizing fiat assets. From the early 2000’s, payment gateways such as Visa and Mastercard have dominated cashless money transfers through their centralized monopolistic network - which in many ways have given them a price setting capability. IPPS aims to provide a breakthrough in this market by leveraging blockchain network as ground truth and thus remove friction and intermediaries within the fiat money transfer systems

## Core System Components:

- Banks: Banks provide us with users fiat balance in their respective accounts. These assets are then tokenized by minting XX tokens in 1:1 ratio according to their fiat balance.
- Stakers: Stakers stake in favor of these banks, validating and lowering risks for users in case banks opt-out from providing fiat balance to our users against XX token. They are rewarded with a portion of transaction fees and governance tokens
- Users: The users of our platform who can make payments, transfer balance in XX tokens (representing their fiat balance) - Should we charge users/ banks for using our service? 
- Merchants: The business organizations registered within a bank - who pays (subscription fee/ percentage amount - per transaction?) a certain amount when receiving XX tokens from users as payments. (Should we/banks charge them cash-out fees when redeeming XX tokens to fiat?)

<details>
<summary>
Secondary Components/Future Scopes of Implementations
</summary>

- DAO: Stakers and contributors get governance tokens according to their contribution/ staking amount. Holding the governance token they can manipulate protocol parameters.
- Operators (Optional): The operators hold power to freeze an account (EOA) temporarily in case of loss of private keys/ cards until a certain time (maybe 24hrs) - which gives the user time to report lost/stolen card/keys to the DAO. The DAO after evaluating the report can assign a different wallet for him/her. (*As the wallets are whitelisted in contracts, the tokens can be manipulated by the DAO - in case of these incidents and the lost address can be replaced by the new one)

</details> 


## User Journey/Process Flows

<details>
<summary>
Bank & User Onboarding
</summary>

- A bank requests to join X platform specifying a limit (which can’t be exceeded for this bank unless changed)
- Stakers verify and stakes in stablecoin
- Banks get limits for the amount which is staked for that particular bank
- Banks provide us with user wallet addresses and initial fiat balance (amount which they internally decide to allow for each user - may vary from user to user based on their use or balance)
- X mints XX tokens to users wallet in 1:1 ratio to its balance (provided by the bank).
- Additionally, the wallets are whitelisted in the protocol so that the tokens are non-transferrable to any other address

</details> 


<details>
<summary>
Merchant Onboarding
</summary>

- Merchant wallet addresses are provided by the banks
- Whenever a token is transferred from other wallets (from users), a small fee is charged - which could be the main source of revenue of IPPS
- Merchants can redeem these tokens from banks

</details> 


<details>
<summary>
Staker Onboarding
</summary>

- Stakers view limit requests by the banks in X platform
- Additional details of banks are uploaded in Filecoin
- Stakers stake an amount in favor of the bank to provide them limit for that particular amount
- Stakers receive transaction fee shares proportional to their staking amount (Whenever users make payments using XX tokens)

</details> 


<details>
<summary>
Additional Note on Staking
</summary>

A Bank can stake in favor of itself too - As onboarding stakers is not our goal. The goal is to minimize the risk for users in case the banks decline to provide fiats against XX tokens. In such circumstances the DAO can reimburse platform users with staked assets (most likely stablecoins).

</details> 

## Feature Checklist
- [x] Smart Contract Logic
- [x] Smart Contract deployment
- [~] Smart Contract testing
- [x] Wallet connect & Disconnect
- [x] On Chain sign Up
- [x] On Chain login
- [x] Customer UI flow
- [x] Merchant UI flow
- [x] Staker UI flow
- [x] Bank UI flow
- [x] Show on chain balance
- [x] Exchange from USDT to EURT and vise versa
- [x] Faucet for EURT token



## Technical Architecture

View on [Figma](https://www.figma.com/file/iBk6vVkyxBR0FvUZ1HrmAV/Project-X%3A-SC-Architecture%2F-Process-Flow?node-id=0%3A1&t=FvD4yd8lHkyO5orw-1)

<img src="https://github.com/leveorxyz/IPPS/blob/main/IPPS_Technical_Architecture.jpg" alt="technical architecture diagram (IPPS)" style="width:200;height:200">


## UI/UX Design Resources (Figma)

- [UI Bank View](https://www.figma.com/proto/wPI748q1IJfKhVQz45jBVN/IPPS%3A-UI-Prototype?node-id=27%3A268&scaling=min-zoom&page-id=27%3A2&starting-point-node-id=27%3A268&show-proto-sidebar=1)
- [UI Stacker View](https://www.figma.com/proto/wPI748q1IJfKhVQz45jBVN/IPPS%3A-UI-Prototype?node-id=27%3A1138&scaling=min-zoom&page-id=27%3A2&starting-point-node-id=27%3A1138&show-proto-sidebar=1)
- [UI Mobile View](https://www.figma.com/proto/wPI748q1IJfKhVQz45jBVN/IPPS%3A-UI-Prototype?node-id=27%3A2426&scaling=min-zoom&page-id=27%3A2&starting-point-node-id=27%3A2426&show-proto-sidebar=1)

## Resources (Presentation, Figma UI)

- [Overview Presentation](https://docs.google.com/presentation/d/e/2PACX-1vTLS1FALc9WhzNpRdLXjeUilkXDKe0Y-oDiKklzU2icUzhjG_hemyJBryyqXMotQH6UrLcHZT_HEAL5/pub?start=false&loop=false&delayms=3000)
- [Prototype Demo](https://youtu.be/WkEaQCn6oBI)


## Build Instructions



<details>
<summary>
Front End Demo
</summary>

- Go to `/frontend`:

  ```bash
  cd frontend
  ```

- Put your web3.storage key in a new local env file:

  `.env.local`
  ```
  NEXT_PUBLIC_WEB3_STORAGE_KEY=
  ```

- Run `yarn install`

- Run `yarn dev`

</details> 

<details>
<summary>
Smart Contract
</summary>

- Create an env to put all private keys for different user roles and alchemy API key:

  `.env`
  ```
  PRIVATE_KEY =
  ALCHEMY_API_KEY =
  QUICKNODE_API_KEY =
  ```
- Compilation: `npx hardhat compile`

- Deployment to Polygon Mumbai Testnet: `npx hardhat run scripts/deploy.ts --network polygon_mumbai`

- Unit Tests: `npx hardhat test`

- To run the full flow in Remix, connect to localhost `remixd -s <path-to-the-shared-folder> -u <remix-ide-instance-URL>`


