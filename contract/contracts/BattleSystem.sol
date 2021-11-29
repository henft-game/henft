// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "./GameToken.sol";
import "./interfaces/IConsumable.sol";

contract BattleSystem is Ownable {
    event BattleEnd(
        address indexed owner,
        uint256 indexed aHeroId,
        uint256 indexed dHeroId,
        uint8 points,
        uint256 date,
        string tokenURI
    );

    address private _gameTokenAddress;
    address private _consumableAddress;

    struct Battle {
        uint256 aHeroId;
        uint256 dHeroId;
        uint8 points;
        uint256 date;
    }

    struct BattleDTO {
        uint256 aHeroId;
        uint256 dHeroId;
        uint8 points;
        uint256 date;
        string tokenURI;
    }

    struct Rank {
        uint256 heroId;
        uint32 points;
    }

    mapping(uint256 => Battle[]) private _battles;

    constructor(address gameTokenAddress) {
        _gameTokenAddress = gameTokenAddress;
    }

    function setConsumableAddress(address _newConsumableAddress)
        external
        onlyOwner
    {
        _consumableAddress = _newConsumableAddress;
    }

    function battle(uint256 _aHeroId) external {
        require(
            msg.sender == GameToken(_gameTokenAddress).ownerOf(_aHeroId),
            "Not owner of attacker"
        );

        GameToken.Hero memory aHero = GameToken(_gameTokenAddress).getHero(
            _aHeroId
        );

        uint256 seed1 = GameToken(_gameTokenAddress).getNextHeroId() +
            aHero.currXP +
            _aHeroId;
        uint256 seed2 = seed1;

        uint256 _bHeroId = rand(
            seed1,
            seed2,
            GameToken(_gameTokenAddress).getNextHeroId() - 1
        );

        seed2 += _bHeroId;

        uint8 points = 0;
        if (_aHeroId != _bHeroId) {
            //hero auto lose versus himself
            points = combat(seed1, seed2, _aHeroId, _bHeroId);
        }

        _battles[_aHeroId].push(
            Battle(_aHeroId, _bHeroId, points, block.timestamp)
        );

        Battle memory b = _battles[_aHeroId][_battles[_aHeroId].length - 1];

        GameToken(_gameTokenAddress).levelUp(_aHeroId, uint16(1));

        seed1 += points;
        seed2 += (_aHeroId + _bHeroId);

        if (_consumableAddress != address(0) && b.points > 0) {
            IConsumable(_consumableAddress).mint(msg.sender);
        }

        emit BattleEnd(
            msg.sender,
            b.aHeroId,
            b.dHeroId,
            b.points,
            b.date,
            GameToken(_gameTokenAddress).tokenURI(b.dHeroId)
        );
    }

    function combat(
        uint256 seed1,
        uint256 seed2,
        uint256 _aHeroId,
        uint256 _bHeroId
    ) internal view returns (uint8) {
        GameToken.Hero memory aHero = GameToken(_gameTokenAddress).getHero(
            _aHeroId
        );

        GameToken.Hero memory bHero = GameToken(_gameTokenAddress).getHero(
            _bHeroId
        );

        bool aHighDex;

        seed1 += getDex(aHero);
        seed2 += getDex(bHero);

        if (getDex(aHero) != getDex(bHero)) {
            aHighDex = getDex(aHero) > getDex(bHero);
        } else {
            aHighDex = (rand(seed1, seed2, 1) == 0);
        }

        int16 aHP = getHP(aHero);
        int16 bHP = getHP(bHero);

        while (aHP > 0 && bHP > 0) {
            seed1 += uint16(aHP);
            seed2 += uint16(bHP);
            uint256 dodgeRandom = rand(seed1, seed2, 100) + 1;

            seed1 += dodgeRandom;
            int16 aDmg = getDmg(seed1, seed2, aHero);

            seed2 += uint16(aDmg);
            int16 bDmg = getDmg(seed1, seed2, bHero);

            seed1 += uint16(bDmg);
            if (aHighDex) {
                if (aHP > 0) {
                    bHP -= aDmg;
                }
                if (bHP > 0) {
                    if (dodgeRandom >= getDodgeChance(aHero, bHero)) {
                        aHP -= bDmg;
                    }
                }
            } else {
                if (bHP > 0) {
                    aHP -= bDmg;
                }
                if (aHP > 0) {
                    if (dodgeRandom >= getDodgeChance(bHero, aHero)) {
                        bHP -= aDmg;
                    }
                }
            }
        }

        return
            aHP > 0
                ? (
                    int8(bHero.level) - int8(aHero.level) > 0
                        ? bHero.level - aHero.level
                        : 1
                )
                : 0;
    }

    function getDex(GameToken.Hero memory _hero) internal pure returns (uint8) {
        return _hero.dex;
    }

    function getStr(GameToken.Hero memory _hero) internal pure returns (uint8) {
        return _hero.str;
    }

    function getCon(GameToken.Hero memory _hero) internal pure returns (uint8) {
        return _hero.con;
    }

    function getWis(GameToken.Hero memory _hero) internal pure returns (uint8) {
        return _hero.wis;
    }

    function getHP(GameToken.Hero memory _hero) internal pure returns (int16) {
        return int16(uint16(8 + (getCon(_hero) * 2)));
    }

    function getDodgeChance(
        GameToken.Hero memory _aHero,
        GameToken.Hero memory _bHero
    ) internal pure returns (uint256) {
        uint8 dodgeChance = (getDex(_aHero) - getDex(_bHero)) * 5;
        if (dodgeChance >= 50) {
            dodgeChance = 50;
        }

        return uint256(dodgeChance);
    }

    function getDmg(
        uint256 seed1,
        uint256 seed2,
        GameToken.Hero memory _hero
    ) internal view returns (int16) {
        seed1 += getStr(_hero);
        seed2 += getWis(_hero);

        uint256 critRandom = rand(seed1, seed2, 100) + 1;

        uint8 critChance = getWis(_hero) * 2;

        return
            int16(
                uint16(
                    getStr(_hero) * (critRandom <= uint256(critChance) ? 2 : 1)
                )
            );
    }

    function getRank(uint256 initialDate, uint256 endDate)
        external
        view
        returns (Rank[] memory)
    {
        uint256 heroSize = GameToken(_gameTokenAddress).getNextHeroId();

        Rank[] memory ret = new Rank[](heroSize);

        for (uint256 heroId = 0; heroId < heroSize; heroId++) {
            uint32 points = 0;

            for (uint256 j = 0; j < _battles[heroId].length; j++) {
                if (
                    initialDate <= _battles[heroId][j].date &&
                    _battles[heroId][j].date <= endDate
                ) {
                    points += _battles[heroId][j].points;
                }
            }

            ret[heroId] = Rank(heroId, points);
        }

        return ret;
    }

    function getBattles(uint256 _heroId)
        external
        view
        returns (BattleDTO[] memory)
    {
        BattleDTO[] memory ret = new BattleDTO[](_battles[_heroId].length);

        for (uint256 index = 0; index < _battles[_heroId].length; index++) {
            Battle memory b = _battles[_heroId][index];
            ret[index] = BattleDTO(
                b.aHeroId,
                b.dHeroId,
                b.points,
                b.date,
                GameToken(_gameTokenAddress).tokenURI(b.dHeroId)
            );
        }

        return ret;
    }

    function rand(
        uint256 seed1,
        uint256 seed2,
        uint256 limit
    ) private view returns (uint256) {
        uint256 seed = uint256(
            keccak256(
                abi.encodePacked(
                    block.timestamp +
                        block.difficulty +
                        seed1 +
                        seed2 +
                        ((
                            uint256(keccak256(abi.encodePacked(block.coinbase)))
                        ) / (block.timestamp)) +
                        block.gaslimit +
                        ((uint256(keccak256(abi.encodePacked(msg.sender)))) /
                            (block.timestamp)) +
                        block.number
                )
            )
        );

        return (seed - ((seed / (limit + 1)) * (limit + 1)));
    }
}
