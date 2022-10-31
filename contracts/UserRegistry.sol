// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "./StakingLimit.sol";

contract UserRegistry {
    mapping (address => bool) whitelist;
    
    modifier onlyBank {
        require(StakingLimit(getStakingLimitAddress()).bankInfo[msg.sender].isRegistered, "UserRegistry: Caller not bank admin");
        _;
    }
    function getWhitelistStatus(address user) public view returns (bool) {
        return whitelist[user];
    }

    function whitelistUser(address user) public {
        whitelist[user] = true;
    }
}