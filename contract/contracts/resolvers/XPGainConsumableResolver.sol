// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "../../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../GameToken.sol";
import "../interfaces/IConsumableResolver.sol";

contract XPGainConsumableResolver is Ownable, IConsumableResolver {
    address private _gameTokenAddress;
    address private _consumableAddress;

    constructor(address gameTokenAddress, address consumableAddress) {
        _gameTokenAddress = gameTokenAddress;
        _consumableAddress = consumableAddress;
    }

    function resolve(
        uint256 _token,
        SharedStructs.Consumable memory _consumable
    ) external {
        require(
            msg.sender == _consumableAddress,
            "Only consumable contract can call this method"
        );

        require(
            msg.sender == GameToken(_gameTokenAddress).ownerOf(_token),
            "Only hero owner can add XP"
        );

        GameToken.Hero memory hero = GameToken(_gameTokenAddress).getHero(
            _token
        );

        uint16 xpGain = (uint16(2**hero.level) * _consumable.percXPGain) / 100;

        if (xpGain > _consumable.maxXPGain) {
            xpGain = _consumable.maxXPGain;
        }

        if (xpGain == 0) {
            xpGain = 1;
        }

        GameToken(_gameTokenAddress).levelUp(_token, xpGain);
    }
}
