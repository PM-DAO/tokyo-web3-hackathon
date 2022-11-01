import { ethers } from "hardhat";

const contractAddress = '0x26310B0F213022021053d896ebbDebdaE886479C'

// MetaMask puclic key @maito1201
const toAddress = '0xcBe10B9C0554ae99D9ec5d64e3E2F900615670dE'

async function main() {
  const PMT = await ethers.getContractFactory("PMToken");
  const token = await PMT.attach(contractAddress)
  // tokenURI is Music video of LITE / Infinite Mirror
  // const log = await token.safeMint(toAddress, 'https://example.com')
  const log = await token.setContentURI(1, 'https://www.youtube.com/watch?v=bzQFu1kEHWQ')
  console.log(`minted ${log.hash}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
