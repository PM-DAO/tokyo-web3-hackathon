// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract PMToken is ERC721, ERC721Enumerable, ERC721URIStorage, ERC721Burnable, Ownable {
    using Counters for Counters.Counter;
    mapping(address => mapping(uint => uint)) public lockTimeOfToken;
    mapping(uint => uint) public balancePerToken;
    mapping(uint => uint) public distributeNumPerToken;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("PMToken", "PMT") {}

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        distributeNumPerToken[tokenId] = 100;
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    //function to donate funds to the token
	function donateToToken(uint tokenId) public payable {
        require(_exists(tokenId), "Token not exists");
        _donateToToken(tokenId);
    }

	function _donateToToken(uint tokenId) internal {
        balancePerToken[tokenId] = balancePerToken[tokenId] + msg.value;
    }

    function withdrawFromToken(uint tokenId) public payable {
        require(_exists(tokenId), "Token not exists");
        require(block.timestamp > lockTimeOfToken[msg.sender][tokenId], "lock time has not expired. Please try again later");
        uint amount = balancePerToken[tokenId] / distributeNumPerToken[tokenId];
        require(balancePerToken[tokenId] >= amount, "Not enough funds in the token. donate required");
        Address.sendValue(payable(msg.sender), amount);
        balancePerToken[tokenId] = balancePerToken[tokenId] - amount;
        lockTimeOfToken[msg.sender][tokenId] = block.timestamp + 10 days;
    }

    function setDistoributeNum(uint tokenId, uint num) public {
        require(_exists(tokenId), "Token not exists");
        require(_isOwner(msg.sender, tokenId), "Caller is not token owner");
        // TODO: import safeMath
        require(num > 0, "Num must be greater than 0");
        _setDistributeNum(tokenId, num);
    }

    function _setDistributeNum(uint tokenId, uint num) internal {
        distributeNumPerToken[tokenId] = num;
    }

    function getBalanceOfToken(uint tokenId) public view returns(uint) {
        require(_exists(tokenId), "Token not exists");
        return balancePerToken[tokenId];
    }

    function getBalance() public view returns(uint) {
        return address(this).balance;
    }

    function _isOwner(address spender, uint256 tokenId) internal view returns (bool) {
        address owner = ERC721.ownerOf(tokenId);
        return spender == owner;
    }
}
