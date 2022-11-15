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
}
