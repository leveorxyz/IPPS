// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "./TokenFactory.sol";
import "./Token.sol";
import "./UserRegistry.sol";
import "./Oracle.sol";

contract ExchangeProtocol {
    address userRegistry;
    address oracleAdddress;

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
        uint256 srcValue = Oracle(oracleAdddress).getAssetPriceInUSD(srcToken);
        uint256 dstValue = Oracle(oracleAdddress).getAssetPriceInUSD(dstToken);
        uint256 srcAmount = (dstAmount * dstValue) / srcValue;
        require(
            IERC20(srcToken).balanceOf(msg.sender) >= srcAmount,
            "ExchangeProtocol: Not enough balance"
        );
        Token(srcToken).burnFrom(msg.sender, srcAmount);
        Token(dstToken).mint(dstReceiver, dstAmount);
    }
}
