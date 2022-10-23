// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

contract UserRegistry {
    mapping (address => bool) whitelist;
    
    function getWhitelistStatus(address user) public view returns (bool) {
        return whitelist[user];
    }
}