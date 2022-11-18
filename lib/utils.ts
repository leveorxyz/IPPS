import { ethers } from "hardhat";

export const getBytes32String = (val: string) => {
const { hexlify, toUtf8Bytes, hexZeroPad } = ethers.utils;
    return hexZeroPad(hexlify(toUtf8Bytes(val)), 32);
};

export const getBytesString = (val: string) => {
    const { hexlify, toUtf8Bytes } = ethers.utils;
        return hexlify(toUtf8Bytes(val));
    };