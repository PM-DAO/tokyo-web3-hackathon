import { ethers } from "hardhat";

const contractAddress = '0xAdA669C89c9FDFe4BBD38133B2C35e35B3CBEEF6'

async function main() {
  // TODO: 必要な数だけデプロイする
  const PMT = await ethers.getContractFactory("PMToken");
  const token = await PMT.attach(contractAddress)
  const log = await token.burn(0)
  console.log(`burned ${log.hash}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
