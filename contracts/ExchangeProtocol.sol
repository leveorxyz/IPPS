// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "./TokenFactory.sol";
import "./Token.sol";
import "./UserRegistry.sol";
import "./Oracle.sol";
import "./interfaces/IUserData.sol";

contract ExchangeProtocol {    
    address contractRegistry;
    address oracleAdddress;
    address rewardPool;
    uint256 feePercent = 1000000;
    uint256 immutable percentDivider = 100000000;

    function initialize(address _contractRegistry) public {
        contractRegistry = _contractRegistry;
    }

    function transferToken(
        address srcToken,
        address dstToken,
        address dstReceiver,
        uint256 dstAmount
    ) public {
        UserRegistry registry = UserRegistry(
            ContractRegistry(contractRegistry).USER_REGISTRY()
        );

        IUserData.UserType senderStatus = registry.getUserStatus(msg.sender);
        IUserData.UserType receiverStatus = registry.getUserStatus(dstReceiver);

        require(senderStatus != IUserData.UserType.UNDEFINED);
        if (senderStatus == IUserData.UserType.ACCOUNT_HOLDER) {
            require(
                receiverStatus != IUserData.UserType.UNDEFINED ||
                    receiverStatus != IUserData.UserType.STAKER
            );
        } else if (
            senderStatus == IUserData.UserType.MERCHANT ||
            senderStatus == IUserData.UserType.STAKER
        ) {
            require(receiverStatus == IUserData.UserType.BANK);
        }

        uint256 feeAmount = receiverStatus == IUserData.UserType.MERCHANT
            ? (dstAmount * feePercent) / percentDivider
            : 0;
        if (srcToken == dstToken) {
            if (feeAmount != 0) {
                uint256 dstAmountAfterFeeDeduction = dstAmount - feeAmount;
                Token(dstToken).transferFrom(
                    msg.sender,
                    dstReceiver,
                    dstAmountAfterFeeDeduction
                );
                Token(dstToken).transferFrom(msg.sender, rewardPool, feeAmount);
            } else {
                Token(srcToken).transferFrom(
                    msg.sender,
                    dstReceiver,
                    dstAmount
                );
            }
        } else {
            uint256 srcValue = Oracle(oracleAdddress).getAssetPriceInUSD(
                srcToken
            );
            uint256 dstValue = Oracle(oracleAdddress).getAssetPriceInUSD(
                dstToken
            );
            uint256 srcAmount = (dstAmount * dstValue) / srcValue;
            Token(srcToken).burnFrom(msg.sender, srcAmount);

            if (feeAmount != 0) {
                uint256 dstAmountAfterFeeDeduction = dstAmount - feeAmount;
                Token(dstToken).mint(dstReceiver, dstAmountAfterFeeDeduction);
                Token(dstToken).mint(rewardPool, feeAmount);
            } else {
                Token(dstToken).mint(dstReceiver, dstAmount);
            }
        }
    }
}
