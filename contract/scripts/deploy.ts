import { ethers } from "hardhat";

async function main() {
  const PMT = await ethers.getContractFactory("PMToken");
  const pmt = await PMT.deploy();

  await pmt.deployed();

  console.log(`deployed to ${pmt.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
