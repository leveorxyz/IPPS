// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

interface IUserData {
    enum UserType {
        UNDEFINED,
        ACCOUNT_HOLDER,
        BANK,
        MERCHANT,
        STAKER
    }
}
