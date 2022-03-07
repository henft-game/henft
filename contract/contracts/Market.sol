// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract Market is Ownable {
    event NewAuction(
        uint256 indexed tokenId,
        uint256 endTime,
        uint256 minValue,
        address seller,
        address newOwner
    );
    event NewBid(uint256 indexed tokenId, uint256 value, address bidder);
    event CancelAuction(uint256 indexed tokenId, address newOwner);
    event AuctionEnded(uint256 indexed tokenId, uint256 currValue, address newOwner);

    event NewSellingItem(uint256 indexed tokenId, uint256 value, address seller, address newOwner);
    event CancelSellingItem(uint256 indexed tokenId, address newOwner);
    event ItemBought(uint256 indexed tokenId, uint256 value, address newOwner);

    address private _gameTokenAddress;

    struct Auction {
        uint256 endTime;
        uint256 minValue;
        uint256 currValue;
        address seller;
        address lastBidAddress;
    }

    struct SellItem {
        uint256 value;
        address seller;
    }

    mapping(uint256 => SellItem) private _sellingHeroes;
    mapping(uint256 => Auction) private _sellingHeroesAuction;

    uint256[] private _sellingHeroesIds;

    uint16 private _minBidIncrement = 110;
    uint16 private _minAuctionTime = 60;

    constructor(address gameTokenAddress) {
        _gameTokenAddress = gameTokenAddress;
    }

    function setMinBidIncrement(uint16 _newMinBidIncrement) public onlyOwner {
        _minBidIncrement = _newMinBidIncrement;
    }

    function setMinAuctionTime(uint16 _newMinAuctionTime) public onlyOwner {
        _minAuctionTime = _newMinAuctionTime;
    }

    function getSellingHeroesIds() public view returns (uint256[] memory) {
        return _sellingHeroesIds;
    }

    function getAuction(uint256 _heroId)
        external
        view
        returns (Auction memory)
    {
        return _sellingHeroesAuction[_heroId];
    }

    function getSelling(uint256 _heroId)
        external
        view
        returns (SellItem memory)
    {
        return _sellingHeroes[_heroId];
    }

    function allowBuy(uint256 _heroId, uint256 _price) external {
        require(
            msg.sender == IERC721(_gameTokenAddress).ownerOf(_heroId),
            "Not owner"
        );
        require(_price > 0, "Price zero");

        require(
            _sellingHeroesAuction[_heroId].endTime <= 0,
            "There is a active auction"
        );

        IERC721(_gameTokenAddress).transferFrom(
            msg.sender,
            address(this),
            _heroId
        );

        _sellingHeroes[_heroId] = SellItem(_price, msg.sender);
        _sellingHeroesIds.push(_heroId);

        emit NewSellingItem(_heroId, _price, msg.sender, address(this));
    }

    function disallowBuy(uint256 _heroId) external {
        require(_sellingHeroes[_heroId].seller == msg.sender, "Not owner");

        IERC721(_gameTokenAddress).transferFrom(
            address(this),
            msg.sender,
            _heroId
        );

        delete _sellingHeroes[_heroId];
        _removeSellingHeroesIds(_heroId);

        emit CancelSellingItem(_heroId, msg.sender);
    }

    function buy(uint256 _heroId) external payable {
        require(_sellingHeroes[_heroId].value > 0, "Hero not for sale");
        require(_sellingHeroes[_heroId].value == msg.value, "Incorrect value");

        payable(_sellingHeroes[_heroId].seller).transfer(msg.value);

        IERC721(_gameTokenAddress).transferFrom(
            address(this),
            msg.sender,
            _heroId
        );

        delete _sellingHeroes[_heroId];
        _removeSellingHeroesIds(_heroId);

        emit ItemBought(_heroId, msg.value, msg.sender);
    }

    function createAuction(
        uint256 _heroId,
        uint256 _endTime,
        uint256 _minPrice
    ) external {
        require(
            msg.sender == IERC721(_gameTokenAddress).ownerOf(_heroId),
            "Not owner"
        );
        require(
            _endTime >= (block.timestamp + _minAuctionTime) * 1_000,
            "Auction must have end time"
        );
        require(_minPrice > 0, "Minimum Price");
        require(
            _sellingHeroesAuction[_heroId].endTime <= 0,
            "Auction already created"
        );
        require(_sellingHeroes[_heroId].value <= 0, "Hero is selling");

        IERC721(_gameTokenAddress).transferFrom(
            msg.sender,
            address(this),
            _heroId
        );

        _sellingHeroesAuction[_heroId] = Auction(
            _endTime,
            _minPrice,
            0,
            msg.sender,
            address(0)
        );
        _sellingHeroesIds.push(_heroId);

        emit NewAuction(_heroId, _endTime, _minPrice, msg.sender, address(this));
    }

    function cancelAuction(uint256 _heroId) external {
        require(
            _sellingHeroesAuction[_heroId].seller == msg.sender,
            "Not owner"
        );

        require(
            _sellingHeroesAuction[_heroId].currValue <= 0,
            "Can't cancel this auction"
        );

        IERC721(_gameTokenAddress).transferFrom(
            address(this),
            msg.sender,
            _heroId
        );

        delete _sellingHeroesAuction[_heroId];
        _removeSellingHeroesIds(_heroId);

        emit CancelAuction(_heroId, msg.sender);
    }

    function bid(uint256 _heroId) external payable {
        Auction storage auction = _sellingHeroesAuction[_heroId];
        require(
            _sellingHeroesAuction[_heroId].endTime > 0,
            "Auction not found"
        );
        require(auction.endTime > block.timestamp * 1_000, "Auction ended");
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

        emit NewBid(_heroId, msg.value, msg.sender);
    }

    function finishAuction(uint256 _heroId) external {
        require(
            _sellingHeroesAuction[_heroId].endTime > 0,
            "Auction not found"
        );
        require(
            _sellingHeroesAuction[_heroId].endTime <= block.timestamp * 1_000,
            "Auction not ended"
        );

        if (_sellingHeroesAuction[_heroId].currValue > 0) {
            payable(_sellingHeroesAuction[_heroId].seller).transfer(
                _sellingHeroesAuction[_heroId].currValue
            );
            IERC721(_gameTokenAddress).transferFrom(
                address(this),
                _sellingHeroesAuction[_heroId].lastBidAddress,
                _heroId
            );
        } else {
            IERC721(_gameTokenAddress).transferFrom(
                address(this),
                _sellingHeroesAuction[_heroId].seller,
                _heroId
            );
        }

        delete _sellingHeroesAuction[_heroId];
        _removeSellingHeroesIds(_heroId);

        if (_sellingHeroesAuction[_heroId].currValue > 0) {
            emit AuctionEnded(_heroId, _sellingHeroesAuction[_heroId].currValue, _sellingHeroesAuction[_heroId].lastBidAddress);
        } else {
            emit AuctionEnded(_heroId, 0, _sellingHeroesAuction[_heroId].seller);
        }
    }

    function _removeSellingHeroesIds(uint256 _heroId) internal {
        uint256 index = _getIndexSellingHeroesIds(_heroId);

        require(index < _sellingHeroesIds.length);
        _sellingHeroesIds[index] = _sellingHeroesIds[
            _sellingHeroesIds.length - 1
        ];
        _sellingHeroesIds.pop();
    }

    function _getIndexSellingHeroesIds(uint256 _heroId)
        internal view
        returns (uint256)
    {
        for (uint256 i = 0; i < _sellingHeroesIds.length; i++) {
            if (_heroId == _sellingHeroesIds[i]) {
                return i;
            }
        }
        return _sellingHeroesIds.length;
    }

    function receiver() external payable {}
}
