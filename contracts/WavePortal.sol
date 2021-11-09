// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {

    struct Pet {
        address petter; // The address of the user who waved.
        string message; // The message the user sent.
        uint256 timestamp; // The timestamp when the user waved.
    }

    Pet[] pets;

    event NewPet(address indexed from, uint256 timestamp, string message);

    constructor() {
        console.log("Ebat'! Ya zadeploil smart-contract na blockchain!");
    }

    function petAFrog(string memory _message) public {
        pets.push(Pet(msg.sender, _message, block.timestamp));
        console.log("%s sent a message.", msg.sender);

        emit NewPet(msg.sender, block.timestamp, _message);
    }

    function getAllPets() public view returns (Pet[] memory) {
        return pets;
    }

    function getTotalPets() public view returns (uint256) {
        return pets.length;
    }
}