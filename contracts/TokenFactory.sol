// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Token.sol";
import "./ContractRegistry.sol";

contract TokenFactory is Ownable {
    event TokenCreation(string name, string symbol, address token);
    
    address contractRegistry;
    mapping(string => address) tokenSymbolToAddress;

    function initialize(address _contractRegistry) public onlyOwner {
        contractRegistry = _contractRegistry;
    }

    function getToken(string calldata name) public view returns (address) {
        return tokenSymbolToAddress[name];
    }

    function createToken(string calldata name, string calldata symbol)
        public
        onlyOwner
    {
        require(
            tokenSymbolToAddress[name] == address(0),
            "TokenFactory: Token already exists"
        );
        Token newToken = new Token(name, symbol, ContractRegistry(contractRegistry).EXCHANGE_PROTOCOL());
        address token = address(newToken);
        require(
            token != address(0),
            "TokenFactory: Token deployment unsuccessful"
        );
        tokenSymbolToAddress[name] = token;
        emit TokenCreation(name, symbol, token);
    }
}
