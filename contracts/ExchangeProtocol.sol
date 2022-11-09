// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "./TokenFactory.sol";
import "./Token.sol";
import "./UserRegistry.sol";
import "./Oracle.sol";

contract ExchangeProtocol {
    address userRegistry;
    address oracleAdddress;
    address rewardPool;
    uint256 feePercent = 1000000;
    uint256 immutable percentDivider = 100000000;

    modifier isWhitelisted(address dstReceiver) {
        require(
            UserRegistry(userRegistry).getWhitelistStatus(msg.sender) &&
                UserRegistry(userRegistry).getWhitelistStatus(dstReceiver),
            "ExchangeProtocol: User not whitelisted"
        );
        _;
    }

    function transferToken(
        address srcToken,
        address dstToken,
        address dstReceiver,
        uint256 dstAmount
    ) public isWhitelisted(dstReceiver) {
        if (srcToken == dstToken) {
            Token(srcToken).transferFrom(msg.sender, dstReceiver, dstAmount);
        } else {
            uint256 srcValue = Oracle(oracleAdddress).getAssetPriceInUSD(
                srcToken
            );
            uint256 dstValue = Oracle(oracleAdddress).getAssetPriceInUSD(
                dstToken
            );
            uint256 srcAmount = (dstAmount * dstValue) / srcValue;
            Token(srcToken).burnFrom(msg.sender, srcAmount);
            uint256 feeAmount = dstAmount * feePercent / percentDivider;
            uint256 dstAmountAfterFeeDeduction = dstAmount - feeAmount;
            Token(dstToken).mint(dstReceiver, dstAmountAfterFeeDeduction);
            Token(dstToken).mint(rewardPool, feeAmount);
        }
    }
}
