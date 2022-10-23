// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Token.sol";

contract TokenFactory is Ownable {
    address exchangeProtocol;
    mapping (string => address) tokenSymbolToAddress;

    function initialize(address _exchangeProtocol) public onlyOwner {
        exchangeProtocol = _exchangeProtocol;
    }

    function getToken(string calldata name) public view returns (address) {
        return tokenSymbolToAddress[name];
    }

    function createToken(string calldata name, string calldata symbol) public onlyOwner{
        require(tokenSymbolToAddress[name] == address(0), "TokenFactory: Token already exists");
        Token newToken = new Token(name, symbol, exchangeProtocol);
        require(address(newToken) != address(0), "TokenFactory: Token deployment unsuccessfull");
        tokenSymbolToAddress[name] = address(newToken);
    }
}