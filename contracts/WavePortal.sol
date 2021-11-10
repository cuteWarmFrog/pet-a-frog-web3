// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {

    uint256 private seed;

    struct Pet {
        address petter; // The address of the user who waved.
        string message; // The message the user sent.
        uint256 timestamp; // The timestamp when the user waved.
    }

    Pet[] pets;

    event NewPet(address indexed from, uint256 timestamp, string message);

     mapping(address => uint256) public lastWavedAt;

    constructor() payable {
        console.log("Ebat'! Ya zadeploil smart-contract na blockchain!");

        seed = (block.timestamp + block.difficulty) % 100;
    }

    function petAFrog(string memory _message) public payable {
        pets.push(Pet(msg.sender, _message, block.timestamp));
        console.log("%s sent a message.", msg.sender);
        emit NewPet(msg.sender, block.timestamp, _message);

        seed = (block.difficulty + block.timestamp + seed) % 100;

        if (seed <= 50 && lastWavedAt[msg.sender] + 1 minutes < block.timestamp) {
            lastWavedAt[msg.sender] = block.timestamp;
            console.log("%s won!", msg.sender);
            uint prize = 0.0001 ether;
            require(prize < address(this).balance,
            'Trying to withdraw more money than the contract has');
            
            (bool success,) = (msg.sender).call{ value: prize}('');
            require(success, 'Failed to withdraw money from contract.');
        }
    }

    function getAllPets() public view returns (Pet[] memory) {
        return pets;
    }

    function getTotalPets() public view returns (uint256) {
        return pets.length;
    }
}