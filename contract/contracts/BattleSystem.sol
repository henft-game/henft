pragma solidity 0.8.9;

import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "./GameToken.sol";

contract BattleSystem is Ownable {
    address private _gameTokenAddress;

    struct Battle {
        uint256 aHeroId;
        uint256 dHeroId;
        uint8 points;
        uint256 date;
    }

    struct Rank {
        uint256 heroId;
        uint32 points;
    }

    mapping(uint256 => Battle[]) private _battles;

    constructor(address gameTokenAddress) {
        _gameTokenAddress = gameTokenAddress;
    }

    function battle(uint256 _aHeroId, uint256 _bHeroId) external {
        require(_aHeroId != _bHeroId, "You can't battle against yourself");
        require(
            msg.sender == GameToken(_gameTokenAddress).ownerOf(_aHeroId),
            "Not owner of attacker"
        );

        _battles[_aHeroId].push(Battle(_aHeroId, _bHeroId, combat(_aHeroId, _bHeroId), block.timestamp));
    }

    function combat(uint256 _aHeroId, uint256 _bHeroId)
        internal
        view
        returns (uint8)
    {
        GameToken.Hero memory aHero = GameToken(_gameTokenAddress).getHero(
            _aHeroId
        );

        GameToken.Hero memory bHero = GameToken(_gameTokenAddress).getHero(
            _bHeroId
        );

        bool aHighDex;

        if (aHero.dex != bHero.dex) {
            aHighDex = aHero.dex > bHero.dex;
        } else {
            aHighDex = (rand(1) == 0);
        }

        int16 aHP = int16(uint16(8 + (aHero.con * 2)));
        int16 bHP = int16(uint16(8 + (bHero.con * 2)));

        while (aHP > 0 && bHP > 0) {
            uint256 dodgeRandom = rand(100) + 1;
            int16 aDmg = getDmg(aHero);
            int16 bDmg = getDmg(bHero);
            if (aHighDex) {
                if (aHP > 0) {
                    bHP -= aDmg;
                }
                if (bHP > 0) {
                    if (dodgeRandom >= uint256(getDodgeChance(aHero, bHero))) {
                        aHP -= bDmg;
                    }
                }
            } else {
                if (bHP > 0) {
                    aHP -= bDmg;
                }
                if (aHP > 0) {
                    if (dodgeRandom >= uint256(getDodgeChance(bHero, aHero))) {
                        bHP -= aDmg;
                    }
                }
            }
        }

        return
            (aHP > 0)
                ? (
                    (aHero.level - bHero.level) > 0
                        ? aHero.level - bHero.level
                        : 1
                )
                : 0;
    }

    function getDodgeChance(
        GameToken.Hero memory _aHero,
        GameToken.Hero memory _bHero
    ) internal view returns (uint8) {
        uint8 dodgeChance = (_aHero.dex - _bHero.dex) * 5;
        if (dodgeChance >= 50) {
            dodgeChance = 50;
        }

        return dodgeChance;
    }

    function getDmg(GameToken.Hero memory _hero) internal view returns (int16) {
        uint256 critRandom = rand(100) + 1;

        uint8 critChance = _hero.inte * 2;

        return
            int16(
                uint16(_hero.str * (critRandom <= uint256(critChance) ? 2 : 1))
            );
    }

    function getRank(uint256 initialDate, uint256 endDate)
        external
        view
        returns (Rank[] memory)
    {
        uint256 heroSize = GameToken(_gameTokenAddress).getCurrentHeroId();

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
        returns (Battle[] memory)
    {
        return _battles[_heroId];
    }

    function rand(uint8 limit) private view returns (uint256) {
        uint256 seed = uint256(
            keccak256(
                abi.encodePacked(
                    block.timestamp +
                        block.difficulty +
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
