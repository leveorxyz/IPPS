// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";

contract ContractRegistry is Ownable {
    address public EXCHANGE_PROTOCOL;
    address public ORACLE;
    address public STAKING_LIMIT;
    address public TOKEN_FACTORY;
    address public USER_REGISTRY;
    address public REWARD_POOL;

    mapping (address => address) priceConsumerV3Addresses;

    function PRICE_CONSUMER_V3(address token) public view returns (address) {
        return priceConsumerV3Addresses[token];
    }
    
    function setPriceConsumerV3Address(address token, address priceConsumerV3) public onlyOwner {
        priceConsumerV3Addresses[token] = priceConsumerV3;
    }
    
    function setExchangeProtocol(address _exchangeProtocol) public onlyOwner {
        EXCHANGE_PROTOCOL = _exchangeProtocol;
    }

    function setOracle(address _oracle) public onlyOwner {
        ORACLE = _oracle;
    }

    function setStakingLimit(address _stakingLimit) public onlyOwner {
        STAKING_LIMIT = _stakingLimit;
    }

    function setTokenFactory(address _tokenFactory) public onlyOwner {
        TOKEN_FACTORY = _tokenFactory;
    }

    function setUserRegistry(address _userRegistry) public onlyOwner {
        USER_REGISTRY = _userRegistry;
    }

    function setRewardPool(address _rewardPool) public onlyOwner {
        REWARD_POOL = _rewardPool;
    }
}
