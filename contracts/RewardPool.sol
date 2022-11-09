// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./StakingLimit.sol";
import "./TokenFactory.sol";
import "./ContractRegistry.sol";

contract RewardPool {
    address contractRegistry;
    address stakingLimit;
    mapping(address => mapping(string => uint256)) rewardInfo;

    function addRewards(address staker, string calldata currency, uint256 amount) public {
        rewardInfo[staker][currency] += amount;
    }

    function claimFeeShare(address staker, string calldata currency) public {
        uint256 feeShare = StakingLimit(stakingLimit).getStakerShareInCurrency(staker, currency);
        require(feeShare > 0, "RewardPool: Not enough fee share");
        IERC20(ContractRegistry(contractRegistry).TOKEN_FACTORY()).transfer(msg.sender, feeShare);
    }
}