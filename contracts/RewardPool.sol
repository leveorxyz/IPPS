// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

contract RewardPool {
    mapping(address => mapping(string => uint256)) rewardInfo;

    function addRewards(address staker, string calldata currency, uint256 amount) public {
        rewardInfo[staker][currency] += amount;
    }
}