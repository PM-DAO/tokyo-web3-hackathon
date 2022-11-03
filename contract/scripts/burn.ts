import { ethers } from "hardhat";

const contractAddress = '0x250ad80574bf9733713A8cB38769F91264D7C5e1'

async function main() {
  const tokenId = 0
  const PMT = await ethers.getContractFactory("PMToken");
  const token = await PMT.attach(contractAddress)
  const log = await token.burn(tokenId)
  console.log(`burned ${log.hash}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
