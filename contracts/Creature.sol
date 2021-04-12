pragma solidity ^0.5.0;

import "./ERC721Tradable.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

/**
 * @title Hero
 * Hero - a contract for my non-fungible heros in three kingdoms.
 */
contract Creature is ERC721Tradable {

    //mapping from token ID to hash rate power!
    mapping(uint256 =>uint256) private _hashRate;

    constructor(address _proxyRegistryAddress)
        public
        ERC721Tradable("Hero", "TKH", _proxyRegistryAddress)
    {}

    function baseTokenURI() public pure returns (string memory) {
        return "https://creatures-api.opensea.io/api/creature/";
    }

    function contractURI() public pure returns (string memory) {
        return "https://creatures-api.opensea.io/contract/opensea-creatures";
    }

    function mintTo(address _to, uint hashRate) public onlyOwner {
        uint256 id= mintTo(_to);
        _hashRate[id]=hashRate;
    }

    function getHashRate(uint256 tokenId) public view returns (uint256) {
        return _hashRate[tokenId];
    }

    function setHashRate(uint256 tokenId, uint256 hashRate) public onlyOwner returns(bool){
        _hashRate[tokenId]=hashRate;
    }

}
