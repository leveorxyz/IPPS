// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

import "./TokenFactory.sol";
import "./Token.sol";
import "./UserRegistry.sol";
import "./Oracle.sol";

contract ExchangeProtocol {
    address userRegistry;
    address oracleAdddress;

    modifier isWhitelisted(address dstReceiver) {
        require(
            UserRegistry(userRegistry).getUserStatus(msg.sender) == IUserData.UserType.ACCOUNT_HOLDER &&
                UserRegistry(userRegistry).getUserStatus(dstReceiver) == IUserData.UserType.ACCOUNT_HOLDER,
            "ExchangeProtocol: User not whitelisted"
        );
        _;
    }

    function transferToken(
        address srcToken,
        address dstToken,
        address dstReceiver,
        int256 dstAmount
    ) public isWhitelisted(dstReceiver) {
        if (srcToken == dstToken) {
            Token(srcToken).transferFrom(msg.sender, dstReceiver, uint256(dstAmount));
        } else {
            int256 srcValue = Oracle(oracleAdddress).getAssetPriceInUSD(
                srcToken
            );
            int256 dstValue = Oracle(oracleAdddress).getAssetPriceInUSD(
                dstToken
            );
            int256 srcAmount = (dstAmount * dstValue) / srcValue;

            Token(srcToken).burnFrom(msg.sender, uint256(srcAmount));
            Token(dstToken).mint(dstReceiver, uint256(dstAmount));
        }
    }
}