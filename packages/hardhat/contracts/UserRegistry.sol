// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

import "./StakingLimit.sol";
import "./ContractRegistry.sol";
import "./interfaces/IUserData.sol";

contract UserRegistry is Ownable(msg.sender) {
    address contractRegistry;

    modifier onlyProtocol() {
        require(
            ContractRegistry(contractRegistry).STAKING_LIMIT() == msg.sender,
            "UserRegistry: Caller does not have access"
        );
        _;
    }

    mapping(address => IUserData.UserType) userCategory;

    function initialize(address _contractRegistry) public onlyOwner {
        contractRegistry = _contractRegistry;
    }

    function getUserStatus(address user)
        public
        view
        returns (IUserData.UserType)
    {
        return userCategory[user];
    }

    function setUserStatus(address user, IUserData.UserType status)
        public
        onlyProtocol
    {
        userCategory[user] = status;
    }
}
