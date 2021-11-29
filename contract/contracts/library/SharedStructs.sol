// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library SharedStructs {
     struct Consumable {
        uint8 percXPGain;
        uint8 maxXPGain;
        bool generateArenaTicket;
        bool generateEquipment;
        bool generateMysteriousChest;
    }
}