// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../library/SharedStructs.sol";

interface IConsumableResolver {
    function resolve(
        uint256 _token,
        SharedStructs.Consumable memory _consumable
    ) external;
}
