// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

contract StakingLimit {
    struct Bank {
        bytes32 routingNumber;
        bool isRegistered;
        bytes bankAddress;
        bytes url;
        mapping(string => mapping(string => uint256)) limitInfo;
    }

    mapping(bytes32 => Bank) bankInfo;
    mapping(address => mapping(bytes32 => mapping(string => uint256))) stakerInfo;

    function register(
        bytes calldata bankName,
        bytes32 routingNumber,
        bytes calldata bankAddress,
        bytes calldata url
    ) public {

    }
}
