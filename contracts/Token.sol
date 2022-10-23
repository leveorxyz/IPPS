// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Token is ERC20, ERC20Burnable, Ownable {
    constructor(string memory name_, string memory symbol_, address exchangeProtocol_)
        ERC20(name_, symbol_)
    {
        _transferOwnership(exchangeProtocol_);
    }
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}