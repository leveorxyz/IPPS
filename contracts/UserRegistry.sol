// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "./StakingLimit.sol";
import "./ContractRegistry.sol";
import "./interfaces/IUserData.sol";

contract UserRegistry {
    address contractRegistry;

    mapping (address => IUserData.UserType) userCategory;

    function initialize(address _contractRegistry) public {
        contractRegistry = _contractRegistry;
    }

    function getUserStatus(address user) public view returns(IUserData.UserType) {
        return userCategory[user];
    }

    function setUserStatus(address user, IUserData.UserType status) public {
        userCategory[user] = status;
    }

    // function getBankRegistrationStatus(address bankAddress) public view returns(bool) {
    //     return StakingLimit(ContractRegistry(CONTRACT_REGISTRY).STAKING_LIMIT()).getBankRegistrationStatus(bankAddress);
    // }

    // function getBankAccountHolderStatus(address user)
    //     public
    //     view
    //     returns (bool)
    // {
    //     return bankAccountHolder[user];
    // }

    // function getMerchantStatus(address user) public view returns (bool) {
    //     return merchant[user];
    // }

    // function whitelistBankAccountHolder(address user) public {
    //     bankAccountHolder[user] = true;
    // }

    // function whitelistMerchant(address user) public {
    //     merchant[user] = true;
    // }
}
