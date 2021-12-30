// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "../../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../BattleSystem.sol";
import "../interfaces/IConsumableResolver.sol";

contract ArenaTicketConsumableResolver is Ownable, IConsumableResolver {
    address private _gameTokenAddress;
    address private _battleSystemAddress;
    address private _consumableAddress;

    constructor(
        address gameTokenAddress,
        address battleSystemAddress,
        address consumableAddress
    ) {
        _gameTokenAddress = gameTokenAddress;
        _battleSystemAddress = battleSystemAddress;
        _consumableAddress = consumableAddress;
    }

    function resolve(
        uint256 _token,
        SharedStructs.Consumable memory _consumable,
        address caller
    ) external {
        require(
            msg.sender == _consumableAddress,
            "Only consumable contract can call this method"
        );

        require(
            caller == GameToken(_gameTokenAddress).ownerOf(_token),
            "Only hero owner can add XP"
        );

        BattleSystem(_battleSystemAddress).freeWin(_token);
    }
}
