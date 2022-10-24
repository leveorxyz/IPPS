// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "./TokenFactory.sol";
import "./UserRegistry.sol";
import "./Oracle.sol";

contract ExchangeProtocol {
    address userRegistry;
    address oracleAdddress;
    
    modifier isWhitelisted() {
        require(UserRegistry(userRegistry).getWhitelistStatus(msg.sender), "ExchangeProtocol: User not whitelisted");
        _;
    }

    function transferToken(address srcToken, address dstToken, address dstReceiver, uint256 dstAmount) public isWhitelisted {
        uint256 srcValue = Oracle(oracleAdddress).getAssetPriceInUSD(srcToken);
        uint256 dstValue = Oracle(oracleAdddress).getAssetPriceInUSD(dstToken);
    }
}