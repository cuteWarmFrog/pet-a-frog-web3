// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalPets;
    address[] gentlemen;

    constructor() {
        console.log("Ebat'! Ya zadeploil smart-contract na local blockchain!");
    }

    function petAFrog() public {
        totalPets += 1;
        gentlemen.push(msg.sender);
        console.log("%s is a polite gentelman!", msg.sender);
    }

    function getTotalPets() public view returns (uint256) {
        console.log("Frog was petted %d times!", totalPets);
        return totalPets;
    }

    function getGentelmen() public view returns (address[] memory) {
        return gentlemen;
    }
}