pragma solidity 0.8.9;

import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IConsumable.sol";
import "./library/SharedStructs.sol";

contract Consumable is IConsumable, ERC721URIStorage, Ownable {
    mapping(address => bool) private _mintPermittedAddress;

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

    function mint(address owner) external onlyPermittedAddress {
        uint256 newConsumableId = _currentConsumableId.current();

        uint256 consumableChance = rand(newConsumableId, 1000) + 1;

        if (consumableChance <= 751) {
            _safeMint(owner, newConsumableId);
            _currentConsumableId.increment();
            if (consumableChance <= 500) {
                _consumables.push(
                    SharedStructs.Consumable(10, 10, false, false, false)
                );
            } else if (consumableChance <= 600) {
                _consumables.push(
                    SharedStructs.Consumable(0, 0, true, false, false)
                );
            } else if (consumableChance <= 700) {
                _consumables.push(
                    SharedStructs.Consumable(0, 0, false, true, false)
                );
            } else if (consumableChance <= 750) {
                _consumables.push(
                    SharedStructs.Consumable(50, 100, false, false, false)
                );
            } else {
                _consumables.push(
                    SharedStructs.Consumable(0, 0, false, false, true)
                );
            }
            
            _setTokenURI(newConsumableId, "CHANGE IT");
            
        }
    }

    function getConsumablesByAddress(address owner)
        public
        view
        returns (uint256[] memory)
    {
        uint256 consumableCount = balanceOf(owner);

        if (consumableCount == 0) {
            return new uint256[](0);
        } else {
            uint256[] memory ret = new uint256[](consumableCount);
            uint256 i;
            uint256 curIndex = 0;

            for (i = 0; i < _currentConsumableId.current(); i++) {
                if (ownerOf(i) == owner) {
                    ret[curIndex++] = i;
                }
            }

            return ret;
        }
    }

    function getMyConsumables() external view returns (uint256[] memory) {
        return getConsumablesByAddress(msg.sender);
    }

    function getConsumable(uint256 _consumableId)
        external
        view
        returns (SharedStructs.Consumable memory)
    {
        return _consumables[_consumableId];
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
