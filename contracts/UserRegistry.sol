// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "./StakingLimit.sol";
import "./ContractRegistry.sol";

contract UserRegistry {
    mapping (address => bool) bankAccountHolder;
    mapping (address => bool) merchant;
    
    modifier onlyBank {
        require(StakingLimit(ContractRegistry(STAKING_LIMIT())).bankInfo[msg.sender].isRegistered, "UserRegistry: Caller not bank admin");
        _;
    }

    function getBankAccountHolderStatus(address user) public view returns (bool) {
        return bankAccountHolder[user];
    }

    function getMerchantStatus(address user) public view returns (bool) {
        return merchant[user];
    }
    function whitelistBankAccountHolder(address user) public {
        bankAccountHolder[user] = true;
    }

    function whitelistMerchant(address user) public {
        merchant[user] = true;
    }
}