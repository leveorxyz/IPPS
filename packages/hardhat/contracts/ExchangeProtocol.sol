// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

import "./TokenFactory.sol";
import "./Token.sol";
import "./UserRegistry.sol";
import "./Oracle.sol";

contract ExchangeProtocol is Ownable(msg.sender) {
    address contractRegistry;
    uint256 feePercent = 1000000;
    uint256 immutable percentDivider = 100000000;

    function initialize(address _contractRegistry) public onlyOwner {
        contractRegistry = _contractRegistry;
    }

    function mintTokenToAccount(
        address to,
        string calldata currency,
        uint256 amount
    ) public {
        UserRegistry registry = UserRegistry(
            ContractRegistry(contractRegistry).USER_REGISTRY()
        );
        IUserData.UserType callerStatus = registry.getUserStatus(msg.sender);
        IUserData.UserType toStatus = registry.getUserStatus(to);
        require(
            callerStatus == IUserData.UserType.BANK,
            "ExchangeProtocol: The caller is not bank"
        );
        require(
            toStatus != IUserData.UserType.STAKER,
            "ExchangeProtocol: The caller is not bank"
        );
        address tokenFactory = ContractRegistry(contractRegistry)
            .TOKEN_FACTORY();
        address token = TokenFactory(tokenFactory).getToken(currency);
        require(
            Token(token).totalSupply() + amount <=
                StakingLimit(ContractRegistry(contractRegistry).STAKING_LIMIT())
                    .getBankGrantedLimit(msg.sender, currency),
            "ExchangeProtocol: The bank cannot mint more that its limit"
        );        
        Token(token).mint(to, amount);
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

        address rewardPool = ContractRegistry(contractRegistry).ORACLE();
        address oracle = ContractRegistry(contractRegistry).ORACLE();

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

        require(
            srcToken != address(0) && dstToken != address(0),
            "ExchangeProtocol: Token doesn't exist"
        );

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
            int256 srcValue = Oracle(oracle).getAssetPriceInUSD(srcToken);
            int256 dstValue = Oracle(oracle).getAssetPriceInUSD(dstToken);
            int256 tempDstAmount = int256(dstAmount);
            int256 srcAmount = (tempDstAmount * dstValue) / srcValue;
            uint256 uSrcAmount = srcAmount < 0
                ? uint256(-srcAmount)
                : uint256(srcAmount);
            Token(srcToken).burnFrom(msg.sender, uSrcAmount);
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