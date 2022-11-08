// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./TokenFactory.sol";

contract StakingLimit is Ownable {
    address factory;
    uint256 immutable percentDivider = 100000000;

    struct Bank {
        bytes32 bankName;
        bytes32 routingNumber;
        bool isRegistered;
        bytes bankAddress;
        bytes url;
        mapping(string => uint256) appliedLimit;
        mapping(string => uint256) grantedLimit;
    }

    struct Staker {
        mapping(string => uint256) totalStakedForCurrency;
        mapping(address => mapping(string => uint256)) stakedForCurrencyInBank;
        mapping(address => mapping(string => uint256)) lockTimeForCurrencyinBank;
    }

    mapping(string => address) supportedStablecoins;
    mapping(address => Bank) bankInfo;
    mapping(address => Staker) stakerInfo;

    function initialize(address _factory) public onlyOwner {
        factory = _factory;
    }

    function getStakerShareInCurrency(address staker, string calldata currency) public view returns (uint256){
        address token = TokenFactory(factory).getToken(currency);
        uint256 supply = IERC20(token).totalSupply();
        uint256 stakedAmount = stakerInfo[staker].totalStakedForCurrency[currency];
        return stakedAmount * percentDivider / supply;
    }

    function getSupportedStablecoins(string calldata name)
        public
        view
        returns (address)
    {
        return supportedStablecoins[name];
    }

    function getBankRegistrationStatus(address bankAddress)
        public
        view
        returns (bool)
    {
        return bankInfo[bankAddress].isRegistered;
    }

    function getBankInfo(address bankAddress)
        public
        view
        returns (
            bytes32,
            bytes32,
            bytes memory,
            bytes memory
        )
    {
        return (
            bankInfo[bankAddress].bankName,
            bankInfo[bankAddress].routingNumber,
            bankInfo[bankAddress].bankAddress,
            bankInfo[bankAddress].url
        );
    }

    function getBankAppliedLimit(address bankAddress, string calldata currency)
        public
        view
        returns (uint256)
    {
        return bankInfo[bankAddress].appliedLimit[currency];
    }

    function getBankGrantedLimit(address bankAddress, string calldata currency)
        public
        view
        returns (uint256)
    {
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

    function addStablecoin(string calldata currency, address stablecoin)
        public
    {
        supportedStablecoins[currency] = stablecoin;
    }

    function stakeForBank(
        address bank,
        string calldata currency,
        uint256 amount
    ) public {
        require(
            supportedStablecoins[currency] != address(0),
            "StakingLimit: This Stablecoin is not supported"
        );
        require(
            bankInfo[bank].isRegistered,
            "StakingLimit: Bank not registered"
        );
        address token = supportedStablecoins[currency];
        IERC20(token).transferFrom(msg.sender, address(this), amount);
        stakerInfo[msg.sender].totalStakedForCurrency[currency] += amount;
        stakerInfo[msg.sender].stakedForCurrencyInBank[bank][
            currency
        ] += amount;
        stakerInfo[msg.sender].lockTimeForCurrencyinBank[bank][currency] =
            block.timestamp +
            30 days;
        bankInfo[bank].grantedLimit[currency] = amount;
    }

    function unstakeFromBank(
        address bank,
        string calldata currency,
        uint256 amount
    ) public {
        require(
            stakerInfo[msg.sender].stakedForCurrencyInBank[bank][currency] >=
                amount,
            "StakingLimit: Staked amount is less than the specified amount"
        );
        require(
            stakerInfo[msg.sender].lockTimeForCurrencyinBank[bank][currency] <=
                block.timestamp,
            "StakingLimit: Asset is locked"
        );
        stakerInfo[msg.sender].totalStakedForCurrency[currency] -= amount;
        stakerInfo[msg.sender].stakedForCurrencyInBank[bank][
            currency
        ] -= amount;
        address token = supportedStablecoins[currency];
        IERC20(token).transfer(msg.sender, amount);
    }
}
