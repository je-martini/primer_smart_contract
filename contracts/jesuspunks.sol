// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./Base64.sol";
import "./jesuspunksDNA.sol";
contract jesuspunks is ERC721, ERC721Enumerable, jesuspunksDNA {
using Counters for Counters.Counter;

Counters.Counter private _idCounter;
uint256 public maxSupply;

constructor(uint256 _maxSupply) ERC721("jesuspunks", "jp"){
    maxSupply = _maxSupply;
}

function mint() public {
    uint256 current = _idCounter.current();
    require(current < maxSupply, "no hay mas");

    _safeMint(msg.sender, current);
    }

    function tokenURI(uint256 tokenId) 
    public 
    view 
    override 
    returns (string memory) 
    {
        require(
            _exists(tokenId),
            "ERC721 metada no existe"
            );

        string memory jsonURI = Base64.encode(
            abi.encodePacked(
                '{ "name": "jesuspunks #',
                tokenId,
                '", "description": "jesuspunks are randomized Avataaars stored on chain to learn DApp development by jesus", "image": "',
                "// TO DO: Calculate image URL",
                '"}'
            )
        );

        return string(abi.encodePacked("data:application/json;base64,", jsonURI));}

// this functions needs to be override require for solidity
 function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}