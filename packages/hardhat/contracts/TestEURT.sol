// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TestEURT is ERC20, Ownable(msg.sender) {
    constructor() ERC20("TestEURT", "EURT") {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}