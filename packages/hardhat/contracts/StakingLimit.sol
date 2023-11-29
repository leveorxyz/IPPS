// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;
import "hardhat/console.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./TokenFactory.sol";
import "./UserRegistry.sol";
import "./interfaces/IUserData.sol";

contract StakingLimit is Ownable(msg.sender) {
    event Registered(
        address indexed bank,
        uint256 indexed time,
        bytes32 indexed bankName
    );
    event Verified(
        address indexed bank,
        uint256 indexed time,
        bytes32 indexed bankName
    );
    event Staked(
        address indexed bank,
        address indexed staker,
        string indexed currency,
        uint256 amount
    );
    event Unstaked(
        address indexed bank,
        address indexed staker,
        string indexed currecncy,
        uint256 amount
    );
    event AppliedForLimit(
        address indexed bank,
        string indexed currency,
        uint256 amount
    );

    address contractRegistry;
    uint256 immutable percentDivider = 100000000;

    struct Bank {
        bytes32 bankName;
        bytes32 routingNumber;
        bool isRegistered;
        bool isVerified;
        bytes bankAddress;
        bytes url;
        mapping(string => uint256) appliedLimit;
        mapping(string => uint256) grantedLimit;
    }

    struct Staker {
        mapping(string => uint256) totalStakedForCurrency;
        mapping(address => mapping(string => uint256)) stakedForCurrencyInBank;
        mapping(address => mapping(string => uint256)) lockTimeForCurrencyInBank;
    }

    mapping(string => address) supportedStablecoins;
    mapping(address => Bank) bankInfo;
    mapping(address => Staker) stakerInfo;

    function initialize(address _contractRegistry) public onlyOwner {
        contractRegistry = _contractRegistry;
    }

    function getStakerShareInCurrency(address staker, string calldata currency)
        public
        view
        returns (uint256)
    {
        address token = TokenFactory(ContractRegistry(contractRegistry).TOKEN_FACTORY()).getToken(currency);
        uint256 supply = IERC20(token).totalSupply();
        uint256 stakedAmount = stakerInfo[staker].totalStakedForCurrency[
            currency
        ];
        return (stakedAmount * percentDivider) / supply;
    }

    function getSupportedStablecoins(string calldata name)
        public
        view
        returns (address)
    {
        return supportedStablecoins[name];
    }

    function getBankVerificationStatus(address bankAddress)
        public
        view
        returns (bool)
    {
        return bankInfo[bankAddress].isVerified;
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
        // require(bankInfo[msg.sender].isRegistered == true, "StakingLimit: Bank not registered");
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
        bytes32 bankName,
        bytes32 routingNumber,
        bytes calldata bankAddress,
        bytes calldata url
    ) public {
        require(bankInfo[msg.sender].isRegistered == false, "StakingLimit: Bank already registered");
        bankInfo[msg.sender].bankName = bankName;
        bankInfo[msg.sender].isRegistered = true;
        bankInfo[msg.sender].routingNumber = routingNumber;
        bankInfo[msg.sender].bankAddress = bankAddress;
        bankInfo[msg.sender].url = url;
    }

    function verifyBank(address bank) external {
        require(bankInfo[bank].bankName != bytes32(0), "Invalid bank");
        bankInfo[bank].isVerified = true;
        UserRegistry(ContractRegistry(contractRegistry).USER_REGISTRY()).setUserStatus(bank, IUserData.UserType.BANK);
    }

    function applyForLimit(string calldata currency, uint256 amount) public {
        require(
            bankInfo[msg.sender].isVerified,
            "StakingLimit: Caller not bank or not verified"
        );
        bankInfo[msg.sender].appliedLimit[currency] += amount;
        emit AppliedForLimit(msg.sender, currency, amount);
    }

    function addStablecoin(string calldata currency, address stablecoin)
        public onlyOwner
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
        require(bankInfo[bank].isVerified, "StakingLimit: Bank not verified");
        require(
            bankInfo[bank].grantedLimit[currency] + amount <=
                bankInfo[bank].appliedLimit[currency],
            "StakingLimit: Staked amount can't cross the applied limit"
        );
        address token = supportedStablecoins[currency];
        IERC20(token).transferFrom(msg.sender, address(this), amount);
        stakerInfo[msg.sender].totalStakedForCurrency[currency] += amount;
        stakerInfo[msg.sender].stakedForCurrencyInBank[bank][
            currency
        ] += amount;
        stakerInfo[msg.sender].lockTimeForCurrencyInBank[bank][currency] =
            block.timestamp +
            30 days;
        bankInfo[bank].grantedLimit[currency] += amount;
        UserRegistry(ContractRegistry(contractRegistry).USER_REGISTRY()).setUserStatus(bank, IUserData.UserType.STAKER);

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
            stakerInfo[msg.sender].lockTimeForCurrencyInBank[bank][currency] <=
                block.timestamp,
            "StakingLimit: Asset is locked"
        ); 
        stakerInfo[msg.sender].totalStakedForCurrency[currency] -= amount;
        stakerInfo[msg.sender].stakedForCurrencyInBank[bank][
            currency
        ] -= amount;
        bankInfo[bank].grantedLimit[currency] -= amount;
        address token = supportedStablecoins[currency];
        IERC20(token).transfer(msg.sender, amount);
    }
}
