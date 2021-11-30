// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../library/SharedStructs.sol";

interface IConsumable is IERC721 {
    function totalSupply() external view returns (uint256);

    function setConsumableTokenURI(uint8 _type, string memory _tokenURI)
        external;

    function setConsumableResolversAddress(uint8 _type, address _newAddress)
        external;

    function addMintPermittedAddress(address newAddress) external;

    function removeMintPermittedAddress(address newAddress) external;

    function mint(address owner) external;

    function getConsumables()
        external
        view
        returns (SharedStructs.Consumable[] memory);

    function getNextConsumableId() external view returns (uint256);

    function getConsumablesByAddress(address owner)
        external
        view
        returns (SharedStructs.Consumable[] memory);

    function getMyConsumables()
        external
        view
        returns (SharedStructs.Consumable[] memory);

    function getConsumable(uint256 _consumableId)
        external
        view
        returns (SharedStructs.Consumable memory);

    function consume(uint256 _token, uint256 _consumableId) external;
}
