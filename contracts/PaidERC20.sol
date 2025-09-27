// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PaidERC20 is ERC20 {
    uint256 public constant FEE = 0.02 ether;
    address payable public immutable feeRecipient;

    constructor(
        string memory name_,
        string memory symbol_,
        uint256 initialSupply_,
        address payable _feeRecipient
    ) payable ERC20(name_, symbol_) {
        require(msg.value >= FEE, "Insufficient fee");
        feeRecipient = _feeRecipient;

        // transfert la fee
        (bool sent, ) = feeRecipient.call{value: FEE}("");
        require(sent, "Fee transfer failed");

        // mint au deployer (qui est l'utilisateur EOA)
        _mint(msg.sender, initialSupply_ * (10 ** decimals()));

        // si l'utilisateur envoie plus que 0.02 ETH, on lui rend le surplus
        if (msg.value > FEE) {
            payable(msg.sender).transfer(msg.value - FEE);
        }
    }
}