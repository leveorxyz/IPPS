// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Token is ERC20, ERC20Burnable, Ownable {
    constructor(
        string memory name_,
        string memory symbol_,
        address exchangeProtocol_
    ) ERC20(name_, symbol_) {
        _transferOwnership(exchangeProtocol_);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public override onlyOwner returns (bool) {
        _transfer(from, to, amount);
        return true;
    }    

    function burnFrom(address account, uint256 amount) public override onlyOwner {
        _burn(account, amount);
    }

    function burn(uint256 amount) public pure override {
        revert("Token: Operation not allowed");
    }

    function transfer(address to, uint256 amount) public override returns (bool) {
        revert("Token: Operation not allowed");
    }

    function allowance(address owner, address spender) public view override returns (uint256) {
        revert("Token: Operation not allowed");
    }
 
    function approve(address spender, uint256 amount) public override returns (bool) {
        revert("Token: Operation not allowed");
    }

    function increaseAllowance(address spender, uint256 addedValue)
        public
        pure
        override
        returns (bool)
    {
        revert("Token: Operation not allowed");
    }

    function decreaseAllowance(address spender, uint256 subtractedValue)
        public
        pure
        override
        returns (bool)
    {
        revert("Token: Operation not allowed");
    }
}