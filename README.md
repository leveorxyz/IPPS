# IPPS

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

