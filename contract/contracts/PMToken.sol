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
  mapping(uint => uint) public _balancePerToken;
  uint public _distributeNum;

  // Optional mapping for music content
  mapping(uint256 => string) private _contentURIs;

  Counters.Counter private _tokenIdCounter;

  constructor() ERC721("PMToken", "PMT") {
    _distributeNum = 100;
  }

  function safeMint(address to, string memory uri) public onlyOwner {
    uint256 tokenId = _tokenIdCounter.current();
    _tokenIdCounter.increment();
    _safeMint(to, tokenId);
    _setTokenURI(tokenId, uri);
  }

  // The following functions are overrides required by Solidity.

  function _beforeTokenTransfer(address from, address to, uint256 tokenId)
    internal
    override(ERC721, ERC721Enumerable)
  {
    super._beforeTokenTransfer(from, to, tokenId);
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

  function donateToToken(uint tokenId) public payable {
    require(_exists(tokenId), "Token not exists");
    _donateToToken(tokenId);
  }

  function _donateToToken(uint tokenId) internal {
    _balancePerToken[tokenId] = _balancePerToken[tokenId] + msg.value;
  }

  function withdrawFromToken(uint tokenId) public payable {
    require(_exists(tokenId), "Token not exists");
    require(block.timestamp > lockTimeOfToken[msg.sender][tokenId], "lock time has not expired. Please try again later");
    uint amount = _balancePerToken[tokenId] / _distributeNum;
    require(_balancePerToken[tokenId] >= amount, "Not enough funds in the token. donate required");
    Address.sendValue(payable(msg.sender), amount);
    _balancePerToken[tokenId] = _balancePerToken[tokenId] - amount;
    lockTimeOfToken[msg.sender][tokenId] = block.timestamp + 7 days;
    // NOTE: token that isn't have donation will burn in production
    // if (_balancePerToken[tokenId] < 100) {
    //   _burn(tokenId);
    // }
  }

  function setDistoributeNum(uint num) public onlyOwner {
    require(num > 0, "Num must be greater than 0");
    _distributeNum = num;
  }

  function getBalanceOfToken(uint tokenId) public view returns(uint) {
    require(_exists(tokenId), "Token not exists");
    return _balancePerToken[tokenId];
  }

  function getBalance() public view returns(uint) {
    return address(this).balance;
  }

  function estimateEarn(uint256 tokenId) public view returns(uint) {
    return _balancePerToken[tokenId] / _distributeNum;
  }

  function contentURI(uint256 tokenId) public view returns (string memory) {
    _exists(tokenId);
    return _contentURIs[tokenId];
  }

  function setContentURI(uint256 tokenId, string memory _contentURI) public payable {
    require(_isOwner(msg.sender, tokenId), "Caller is not token owner");
    require(_exists(tokenId), "URI set of nonexistent token");
    require (msg.value >= 100, "setContent needs tx value more than 100 wei");
    _contentURIs[tokenId] = _contentURI;
    _balancePerToken[tokenId] =  msg.value;
  }

  function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
    super._burn(tokenId);
    if (bytes(_contentURIs[tokenId]).length != 0) {
      delete _contentURIs[tokenId];
    }
  }

  function _isOwner(address spender, uint256 tokenId) internal view returns (bool) {
    address owner = ERC721.ownerOf(tokenId);
    return spender == owner;
  }
}
