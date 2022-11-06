// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";

contract ContractRegistry is Ownable {
    address public EXCHANGE_PROTOCOL;
    address public ORACLE;
    address public STAKING_LIMIT;
    address public TOKEN_FACTORY;
    address public USER_REGISTRY;

    function setExchangeProtocol(address _exchangeProtocol) public {
        EXCHANGE_PROTOCOL = _exchangeProtocol;
    }

    function setOracle(address _oracle) public {
        ORACLE = _oracle;
    }

    function setStakingLimit(address _stakingLimit) public {
        STAKING_LIMIT = _stakingLimit;
    }

    function setTokenFactory(address _tokenFactory) public {
        TOKEN_FACTORY = _tokenFactory;
    }

    function setUserRegistry(address _userRegistry) public {
        USER_REGISTRY = _userRegistry;
    }
}