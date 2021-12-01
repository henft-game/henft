// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IConsumable.sol";
import "./interfaces/IConsumableResolver.sol";
import "./library/SharedStructs.sol";

contract Consumable is IConsumable, ERC721URIStorage, Ownable {
    event ConsumableMinted(
        address indexed owner,
        uint256 indexed tokenId,
        uint256 indexed heroId,
        int8 consumableType,
        string tokenURI
    );
    event ConsumableUsed(
        address indexed owner,
        uint256 indexed tokenId,
        uint8 consumableType
    );

    mapping(address => bool) private _mintPermittedAddress;
    mapping(uint8 => address) private _consumableResolversAddress;
    mapping(uint8 => string) private _consumableTokenURI;

    using Counters for Counters.Counter;
    Counters.Counter private _currentConsumableId;

    SharedStructs.Consumable[] private _consumables;

    string private _baseTokenURI;

    constructor(
        string memory name,
        string memory symbol,
        string memory baseTokenURI
    ) ERC721(name, symbol) {
        _baseTokenURI = baseTokenURI;
    }

    function totalSupply() external view returns (uint256) {
        return _consumables.length;
    }

    function setConsumableTokenURI(uint8 _type, string memory _tokenURI)
        external
        onlyOwner
    {
        _consumableTokenURI[_type] = _tokenURI;
    }

    function setConsumableResolversAddress(uint8 _type, address _newAddress)
        external
        onlyOwner
    {
        _consumableResolversAddress[_type] = _newAddress;
    }

    function addMintPermittedAddress(address newAddress) external onlyOwner {
        _mintPermittedAddress[newAddress] = true;
    }

    function removeMintPermittedAddress(address newAddress) external onlyOwner {
        delete _mintPermittedAddress[newAddress];
    }

    modifier onlyPermittedAddress() {
        require(
            _mintPermittedAddress[_msgSender()],
            "Only permitted address can execute this action"
        );
        _;
    }

    function getConsumables()
        external
        view
        returns (SharedStructs.Consumable[] memory)
    {
        return _consumables;
    }

    function getNextConsumableId() external view returns (uint256) {
        return _currentConsumableId.current();
    }

    function mint(uint256 heroId, address owner) external onlyPermittedAddress {
        uint256 newConsumableId = _currentConsumableId.current();

        uint256 consumableChance = rand(newConsumableId, 1000) + 1;
        int8 consumableType = -1;

        if (consumableChance <= 750) {
            _safeMint(owner, newConsumableId);
            _currentConsumableId.increment();
            if (consumableChance <= 500) {
                _consumables.push(
                    SharedStructs.Consumable(
                        newConsumableId,
                        10,
                        10,
                        false,
                        false
                    )
                );
                consumableType = 0;
            } else if (consumableChance <= 600) {
                _consumables.push(
                    SharedStructs.Consumable(
                        newConsumableId,
                        0,
                        0,
                        true,
                        false
                    )
                );
                consumableType = 2;
            } else if (consumableChance <= 700) {
                _consumables.push(
                    SharedStructs.Consumable(
                        newConsumableId,
                        0,
                        0,
                        false,
                        true
                    )
                );
                consumableType = 3;
            } else if (consumableChance <= 750) {
                _consumables.push(
                    SharedStructs.Consumable(
                        newConsumableId,
                        50,
                        100,
                        false,
                        false
                    )
                );
                consumableType = 1;
            }

            _setTokenURI(newConsumableId, _consumableTokenURI[uint8(consumableType)]);

        }
        emit ConsumableMinted(owner, newConsumableId, heroId, consumableType, tokenURI(newConsumableId));
    }

    function getConsumablesByAddress(address owner)
        public
        view
        returns (SharedStructs.Consumable[] memory)
    {
        uint256 consumableCount = balanceOf(owner);

        if (consumableCount == 0) {
            return new SharedStructs.Consumable[](0);
        } else {
            SharedStructs.Consumable[]
                memory ret = new SharedStructs.Consumable[](consumableCount);
            uint256 i;
            uint256 curIndex = 0;

            for (i = 0; i < _consumables.length; i++) {
                if (ownerOf(_consumables[i].id) == owner) {
                    ret[curIndex++] = _consumables[i];
                }
            }

            return ret;
        }
    }

    function getMyConsumables()
        external
        view
        returns (SharedStructs.Consumable[] memory)
    {
        return getConsumablesByAddress(msg.sender);
    }

    function getConsumable(uint256 _consumableId)
        external
        view
        returns (SharedStructs.Consumable memory)
    {
        return _getConsumable(_consumableId);
    }

    function _getConsumable(uint256 _consumableId)
        internal
        view
        returns (SharedStructs.Consumable memory)
    {
        for (uint256 index = 0; index < _consumables.length; index++) {
            if (_consumables[index].id == _consumableId) {
                return _consumables[index];
            }
        }
    }

    function consume(uint256 _token, uint256 _consumableId) external {
        require(msg.sender == ownerOf(_consumableId), "Not owner");

        SharedStructs.Consumable memory consumable = _getConsumable(
            _consumableId
        );

        uint8 consumableType;

        if (consumable.maxXPGain == 10 && consumable.percXPGain == 10) {
            consumableType = 0;
        } else if (consumable.maxXPGain == 100 && consumable.percXPGain == 50) {
            consumableType = 1;
        } else if (consumable.generateArenaTicket) {
            consumableType = 2;
        } else if (consumable.generateEquipment) {
            consumableType = 3;
        }

        require(
            _consumableResolversAddress[consumableType] != address(0),
            "Consumable resolver not defined"
        );

        IConsumableResolver(_consumableResolversAddress[consumableType])
            .resolve(_token, consumable);

        _removeConsumable(_consumableId);
        _burn(_consumableId);

        emit ConsumableUsed(msg.sender, _consumableId, consumableType);
    }

    function _removeConsumable(uint256 _consumableId) internal {
        uint256 index = _getIndexConsumable(_consumableId);

        require(index < _consumables.length);
        _consumables[index] = _consumables[_consumables.length - 1];
        _consumables.pop();
    }

    function _getIndexConsumable(uint256 _consumableId)
        internal
        view
        returns (uint256)
    {
        for (uint256 i = 0; i < _consumables.length; i++) {
            if (_consumableId == _consumables[i].id) {
                return i;
            }
        }
        return _consumables.length;
    }

    function rand(uint256 seed1, uint256 limit) private view returns (uint256) {
        uint256 seed = uint256(
            keccak256(
                abi.encodePacked(
                    block.timestamp +
                        block.difficulty +
                        seed1 +
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
