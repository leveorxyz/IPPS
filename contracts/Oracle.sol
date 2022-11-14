// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "./TokenFactory.sol";
import "./chainlink/PriceConsumerV3.sol";

contract Oracle {
    address contractRegistry;

    function initialize(address _contractRegistry) public {
        contractRegistry = _contractRegistry;
    }

    function getAssetPriceInUSD(string calldata currency) public view returns (int256) {
        return PriceConsumerV3(ContractRegistry(contractRegistry).PRICE_CONSUMER_V3(currency)).getLatestPrice();
    }
}
