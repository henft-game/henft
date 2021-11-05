pragma solidity 0.8.9;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract GameToken is ERC721, Ownable {
    enum HeroType {
        TANK,
        ROGUE,
        MAGE,
        FIGHTER
    }
    enum HeroRarity {
        COMMON,
        UNCOMMON,
        LEGENDARY
    }

    struct Hero {
        string name;
        HeroType heroType;
        uint8 str;
        uint8 con;
        uint8 dex;
        uint8 inte;
        uint16 level;
    }

    uint256 private _currentHeroId = 0;

    mapping(uint256 => Hero) private _heroes;
    mapping(uint256 => uint256) private _sellingHeroes;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        mint("first one", HeroType.TANK, 1, 1, 1, 1);
        mint("second one", HeroType.ROGUE, 1, 1, 1, 1);
        mint("third one", HeroType.MAGE, 1, 1, 1, 1);
    }

    function mint(
        string memory name,
        HeroType heroType,
        uint8 str,
        uint8 con,
        uint8 dex,
        uint8 inte
    ) public onlyOwner {
        _safeMint(msg.sender, _currentHeroId);
        _heroes[_currentHeroId] = Hero(name, heroType, str, con, dex, inte, 1);

        _currentHeroId++;
    }

    function getHeroesByAddress(address owner)
        public
        view
        returns (uint256[] memory)
    {
        uint256 heroCount = balanceOf(owner);

        if (heroCount == 0) {
            return new uint256[](0);
        } else {
            uint256[] memory ret = new uint256[](heroCount);
            uint256 i;
            uint256 curIndex = 0;

            for (i = 0; i < _currentHeroId; i++) {
                if (ownerOf(i) == owner) {
                    ret[curIndex] = i;
                }
            }

            return ret;
        }
    }

    function getMyHeroes() external view returns (uint256[] memory) {
        return getHeroesByAddress(msg.sender);
    }

    function getHero(uint256 _heroId) external view returns (Hero memory) {
        return _heroes[_heroId];
    }

    function levelUp(uint256 _heroId) external {
        require(msg.sender == ownerOf(_heroId), "Not owner of this hero");

        Hero storage hero = _heroes[_heroId];

        hero.level++;

        uint256 random = rand(3);

        if (random == 0) {
            hero.str++;
        } else if (random == 1) {
            hero.con++;
        } else if (random == 2) {
            hero.dex++;
        } else if (random == 3) {
            hero.inte++;
        }
    }

    function allowBuy(uint256 _heroId, uint256 _price) external {
        require(msg.sender == ownerOf(_heroId), "Not owner of this hero");
        require(_price > 0, "Price zero");
        _sellingHeroes[_heroId] = _price;
    }

    function disallowBuy(uint256 _heroId) external {
        require(msg.sender == ownerOf(_heroId), "Not owner of this hero");
        _sellingHeroes[_heroId] = 0;
    }

    function buy(uint256 _heroId) external payable {
        uint256 price = _sellingHeroes[_heroId];
        require(price > 0, "This hero is not for sale");
        require(msg.value == price, "Incorrect value");

        address seller = ownerOf(_heroId);

        payable(seller).transfer(msg.value);

        _safeTransfer(seller, msg.sender, _heroId, "");
        _sellingHeroes[_heroId] = 0;
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
