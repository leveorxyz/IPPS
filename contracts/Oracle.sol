// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "./TokenFactory.sol";
import "./chainlink/PriceConsumerV3.sol";

contract Oracle {
    address contractRegistry;

    function initialize(address _contractRegistry) public {
        contractRegistry = _contractRegistry;
    }

    function getAssetPriceInUSD(address token) public view returns (int256) {
        require(ContractRegistry(contractRegistry).PRICE_CONSUMER_V3(token) != address(0), "Oracle: Feed for currency doesn't exist");
        if (TokenFactory(ContractRegistry(contractRegistry).TOKEN_FACTORY()).getToken("USD") == token) {
            return 1;
        }
        else return PriceConsumerV3(ContractRegistry(contractRegistry).PRICE_CONSUMER_V3(token)).getLatestPrice();
    }
}
