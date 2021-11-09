pragma solidity 0.8.9;

import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract GameToken is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _currentHeroId;

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
        uint8 inte;
        uint8 level;
    }

    struct Auction {
        uint256 endTime;
        uint256 minValue;
        uint256 currValue;
        address lastBidAddress;
    }

    mapping(uint256 => Hero) private _heroes;
    mapping(uint256 => uint256) private _sellingHeroes;

    mapping(uint256 => Auction) private _sellingHeroesAuction;

    uint16 private _minBidIncrement = 110;
    uint16 private _minAuctionTime = 60;

    mapping(HeroType => uint8[]) private _mapMint;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        _mapMint[HeroType.FIGHTER] = [0, 1, 0, 2, 3, 1];
        _mapMint[HeroType.ROGUE] = [2, 2, 0, 3, 0, 2];
        _mapMint[HeroType.MAGE] = [3, 3, 2, 1, 0, 3];
        _mapMint[HeroType.TANK] = [1, 1, 0, 2, 3, 1];
    }

    function setMinBidIncrement(uint16 _newMinBidIncrement) public onlyOwner {
        _minBidIncrement = _newMinBidIncrement;
    }

    function setMinAuctionTime(uint16 _newMinAuctionTime) public onlyOwner {
        _minAuctionTime = _newMinAuctionTime;
    }

    function mint(HeroType _heroType, HeroRarity _heroRarity) public onlyOwner {
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
        _setTokenURI(newHeroId, "teste");
        _heroes[newHeroId] = Hero(
            "",
            _heroType,
            _heroRarity,
            attrs[0],
            attrs[1],
            attrs[2],
            attrs[3],
            1
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

    function getAuction(uint256 _heroId)
        external
        view
        returns (Auction memory)
    {
        return _sellingHeroesAuction[_heroId];
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

        require(
            _sellingHeroesAuction[_heroId].endTime <= 0,
            "There is a active auction"
        );

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

    function createAuction(
        uint256 _heroId,
        uint256 _endTime,
        uint256 _minPrice
    ) external {
        require(msg.sender == ownerOf(_heroId), "Not owner of this hero");
        require(
            _endTime >= (block.timestamp + _minAuctionTime) * 1_000,
            "Auction must have end time of minimum of ten minutes"
        );
        require(_minPrice > 0, "Minimum Price greater then zero");
        require(
            _sellingHeroesAuction[_heroId].endTime <= 0,
            "Auction already created"
        );
        require(
            _sellingHeroes[_heroId] <= 0,
            "This token is setted to sell"
        );


        _sellingHeroesAuction[_heroId] = Auction(
            _endTime,
            _minPrice,
            0,
            address(0)
        );
    }

    function cancelAuction(uint256 _heroId) external {
        require(msg.sender == ownerOf(_heroId), "Not owner of this hero");

        Auction memory auction = _sellingHeroesAuction[_heroId];

        require(
            auction.currValue <= 0,
            "Already has a bid, can not cancel this auction more"
        );

        delete _sellingHeroesAuction[_heroId];
    }

    function bid(uint256 _heroId) external payable {
        Auction storage auction = _sellingHeroesAuction[_heroId];
        require(
            _sellingHeroesAuction[_heroId].endTime > 0,
            "Auction not found"
        );
        require(auction.endTime > block.timestamp, "Auction ended");
        require(
            msg.value >= uint256((auction.currValue * _minBidIncrement) / 100),
            "Incorrect value"
        );

        //payable(address(this)).transfer(msg.value);

        if (auction.lastBidAddress != address(0)) {
            payable(auction.lastBidAddress).transfer(auction.currValue);
        }

        auction.currValue = msg.value;
        auction.lastBidAddress = msg.sender;
    }

    function finishAuction(uint256 _heroId) external {
        Auction memory auction = _sellingHeroesAuction[_heroId];

        require(
            _sellingHeroesAuction[_heroId].endTime > 0,
            "Auction not found"
        );
        require(auction.endTime <= block.timestamp * 1_000, "Auction not ended");

        if (auction.currValue > 0) {

            address seller = ownerOf(_heroId);

            payable(seller).transfer(auction.currValue);
            _safeTransfer(seller, auction.lastBidAddress, _heroId, "");

        }

        delete _sellingHeroesAuction[_heroId];
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

    function receiver() external payable {}
}
