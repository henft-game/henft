pragma solidity 0.8.9;

import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "./GameToken.sol";

contract BattleSystem is Ownable {
    address private _gameTokenAddress;
    address private _itemAddress;

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

    function battle(uint256 _aHeroId, uint256 _bHeroId) external {
        require(_aHeroId != _bHeroId, "You can't battle against yourself");
        require(
            msg.sender == GameToken(_gameTokenAddress).ownerOf(_aHeroId),
            "Not owner of attacker"
        );

        uint8 points = combat(_aHeroId, _bHeroId);

        _battles[_aHeroId].push(
            Battle(_aHeroId, _bHeroId, points, block.timestamp)
        );

        GameToken(_gameTokenAddress).levelUp(_aHeroId, uint16(1));
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

        if (getDex(aHero) != getDex(bHero)) {
            aHighDex = getDex(aHero) > getDex(bHero);
        } else {
            aHighDex = (rand(1) == 0);
        }

        int16 aHP = getHP(aHero);
        int16 bHP = getHP(bHero);

        while (aHP > 0 && bHP > 0) {
            uint256 dodgeRandom = rand(100) + 1;
            int16 aDmg = getDmg(aHero);
            int16 bDmg = getDmg(bHero);
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

    function getDmg(GameToken.Hero memory _hero) internal view returns (int16) {
        uint256 critRandom = rand(100) + 1;

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
