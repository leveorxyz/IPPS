// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Token.sol";

contract TokenFactory is Ownable {
    mapping (string => address) tokenSymbolToAddress;

    function createToken(string calldata name, string calldata symbol) public onlyOwner{
        Token newToken = new Token(name, symbol);
        tokenSymbolToAddress[name] = address(newToken);
    }
}