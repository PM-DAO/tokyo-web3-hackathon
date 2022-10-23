import { ethers } from "hardhat";

const contractAddress = '0xAdA669C89c9FDFe4BBD38133B2C35e35B3CBEEF6'

// MetaMask puclic key @maito1201
const toAddress = '0xcBe10B9C0554ae99D9ec5d64e3E2F900615670dE'

async function main() {
  const PMT = await ethers.getContractFactory("PMToken");
  const token = await PMT.attach(contractAddress)
  // tokenURI is Music video of LITE / Infinite Mirror
  const log = await token.safeMint(toAddress, 'https://www.youtube.com/watch?v=bzQFu1kEHWQ')
  console.log(`minted ${log.hash}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
