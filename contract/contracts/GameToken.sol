pragma solidity 0.8.9;

import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract GameToken is ERC721URIStorage, Ownable {

    event HeroLevelUp(uint256 indexed tokenId, uint8 indexed level);

    using Counters for Counters.Counter;
    Counters.Counter private _currentHeroId;

    address public _battleAddress;
    address public _itemShopAddress;

    enum HeroType {
        FIGHTER,
        ROGUE,
        MAGE,
        TANK
    }
    enum HeroRarity {
        COMMON,
        UNCOMMON,
        RARE,
        LEGENDARY
    }

    struct Hero {
        string name;
        HeroType heroType;
        HeroRarity rarity;
        uint8 str;
        uint8 con;
        uint8 dex;
        uint8 wis;
        uint8 level;
        uint16 currXP;
    }

    Hero[] private _heroes;

    string private _baseTokenURI;

    mapping(HeroType => uint8[]) private _mapMint;

    constructor(
        string memory name,
        string memory symbol,
        string memory baseTokenURI
    ) ERC721(name, symbol) {
        _baseTokenURI = baseTokenURI;

        _mapMint[HeroType.FIGHTER] = [0, 1, 0, 2, 3, 1];
        _mapMint[HeroType.ROGUE] = [2, 2, 0, 3, 0, 2];
        _mapMint[HeroType.MAGE] = [3, 3, 2, 1, 0, 3];
        _mapMint[HeroType.TANK] = [1, 1, 0, 2, 3, 1];
    }

    function setBattleAddress(address _newBattleAddress) public onlyOwner {
        _battleAddress = _newBattleAddress;
    }

    function setItemShopAddress(address _newItemShopAddress) public onlyOwner {
        _itemShopAddress = _newItemShopAddress;
    }

    function getHeroes() external view returns (Hero[] memory) {
        return _heroes;
    }

    function getCurrentHeroId() external view returns (uint256) {
        return _currentHeroId.current();
    }

    function mint(
        HeroType _heroType,
        HeroRarity _heroRarity,
        string memory _tokenURI
    ) public onlyOwner {
        uint256 newHeroId = _currentHeroId.current();

        uint8 minAttr;
        uint8 maxAttr;

        if (_heroRarity == HeroRarity.COMMON) {
            minAttr = 4;
            maxAttr = 6;
        } else if (_heroRarity == HeroRarity.UNCOMMON) {
            minAttr = 7;
            maxAttr = 8;
        } else if (_heroRarity == HeroRarity.RARE) {
            minAttr = 9;
            maxAttr = 10;
        } else {
            minAttr = 11;
            maxAttr = 12;
        }

        uint256 attrsSize = rand(maxAttr - minAttr) + minAttr;

        uint8[] memory attrs = new uint8[](4);
        attrs[0] = 1;
        attrs[1] = 1;
        attrs[2] = 1;
        attrs[3] = 1;
        uint8 attrCounter = 0;

        for (uint8 i = 1; i <= attrsSize; i++) {
            attrs[_mapMint[_heroType][attrCounter]]++;
            if (attrCounter == 5) {
                attrCounter = 0;
            } else {
                attrCounter++;
            }
        }

        _safeMint(msg.sender, newHeroId);
        _setTokenURI(newHeroId, _tokenURI);
        _heroes.push(
            Hero(
                "",
                _heroType,
                _heroRarity,
                attrs[0],
                attrs[1],
                attrs[2],
                attrs[3],
                1,
                0
            )
        );

        _currentHeroId.increment();
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

            for (i = 0; i < _currentHeroId.current(); i++) {
                if (ownerOf(i) == owner) {
                    ret[curIndex++] = i;
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

    function setName(uint256 _heroId, string memory _name) external {
        require(msg.sender == ownerOf(_heroId), "Not owner");
        Hero storage hero = _heroes[_heroId];

        hero.name = _name;
    }

    function levelUp(uint256 _heroId, uint16 _xp) external {
        require(
            msg.sender == _battleAddress || msg.sender == _itemShopAddress ,
            "Only battle or item shop contract can execute it"
        );

        Hero storage hero = _heroes[_heroId];

        hero.currXP += _xp;

        if (hero.currXP >= 2**(hero.level + 1)) {
            hero.level++;
            hero.currXP = 0;

            uint256 random = rand(3);

            if (random == 0) {
                hero.str++;
            } else if (random == 1) {
                hero.con++;
            } else if (random == 2) {
                hero.dex++;
            } else if (random == 3) {
                hero.wis++;
            }

            emit HeroLevelUp(_heroId, hero.level);
        }
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

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        return string(abi.encodePacked(_baseTokenURI, super.tokenURI(tokenId)));
    }
}
