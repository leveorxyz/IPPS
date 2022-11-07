// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

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

    mapping(string => address) supportedStablecoins;
    mapping(address => Bank) bankInfo;
    mapping(address => mapping(address => mapping(string => uint256))) stakerInfo;

    function getSupportedStablecoins(string calldata name) public view returns(address){
        return supportedStablecoins[name];
    }

    function getBankRegistrationStatus(address bankAddress) public view returns (bool ) {
        return bankInfo[bankAddress].isRegistered;
    }

    function getBankInfo(address bankAddress) public view returns(bytes32, bytes32, bytes memory, bytes memory ){
        return (bankInfo[bankAddress].bankName, bankInfo[bankAddress].routingNumber, bankInfo[bankAddress].bankAddress, bankInfo[bankAddress].url);
    }

    function getBankAppliedLimit(address bankAddress, string calldata currency) public view returns (uint256) {
        return bankInfo[bankAddress].appliedLimit[currency];
    }

    function getBankGrantedLimit(address bankAddress, string calldata currency) public view returns (uint256) {
        return bankInfo[bankAddress].grantedLimit[currency];
    }

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

    function addStablecoin(string calldata currency, address stablecoin) public {
        supportedStablecoins[currency] = stablecoin;
    }

    function stakeForBank(address bank, string calldata currency, uint256 amount) public {
        require(supportedStablecoins[currency] != address(0), "StakingLimit: This Stablecoin is not supported");
        require(bankInfo[bank].isRegistered, "StakingLimit: Bank not registered");
        address token = supportedStablecoins[currency];
        IERC20(token).transferFrom(msg.sender, address(this), amount);
        stakerInfo[msg.sender][bank][currency] = amount;
        bankInfo[bank].grantedLimit[currency] = amount;
    }
}
