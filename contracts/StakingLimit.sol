// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

contract StakingLimit {
    struct Bank {
        bytes32 bankName;
        bytes32 routingNumber;
        bool isRegistered;
        bytes bankAddress;
        bytes url;
        mapping(string => uint256) appliedLimit;
        mapping(string => uint256) grantedLimit;
    }

    mapping(address => Bank) bankInfo;
    mapping(address => mapping(bytes32 => mapping(string => uint256))) stakerInfo;

    function register(
        address bankAdmin,
        bytes32 routingNumber,
        bytes calldata bankAddress,
        bytes calldata url
    ) public {
        bankInfo[bankAdmin].routingNumber = routingNumber;
        bankInfo[bankAdmin].bankAddress = bankAddress;
        bankInfo[bankAdmin].url = url;
    }

    function stakeForBank(address bank, string calldata currency, uint256 amount) 
}
