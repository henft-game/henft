pragma solidity ^0.8.0;

import "../../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../library/SharedStructs.sol";

interface IConsumable is IERC721 {

    function addMintPermittedAddress(address newAddress) external;

    function removeMintPermittedAddress(address newAddress) external;

    function mint(address owner) external;

    function getConsumables() external view returns (SharedStructs.Consumable[] memory);

    function getNextConsumableId() external view returns (uint256);

    function getConsumablesByAddress(address owner)
        external
        view
        returns (uint256[] memory);

    function getMyConsumables() external view returns (uint256[] memory);

    function getConsumable(uint256 _consumableId)
        external
        view
        returns (SharedStructs.Consumable memory);
}
