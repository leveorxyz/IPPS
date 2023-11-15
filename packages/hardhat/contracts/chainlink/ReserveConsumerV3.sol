// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract ReserveConsumerV3 {
    AggregatorV3Interface internal reserveFeed;

    /**
     * Network: Polygon Mumbai
     * Aggregator: USD PoR
     * Address: "Custom deployed contracts"
     */
    constructor(address _customContract) {
        reserveFeed = AggregatorV3Interface(
            _customContract
        );
    }

    /**
     * Returns the latest price
     */
    function getLatestReserve() public view returns (int) {
        (
            ,
            /*uint80 roundID*/ int reserve /*uint startedAt*/ /*uint timeStamp*/ /*uint80 answeredInRound*/,
            ,
            ,

        ) = reserveFeed.latestRoundData();
        return reserve;
    }
}
