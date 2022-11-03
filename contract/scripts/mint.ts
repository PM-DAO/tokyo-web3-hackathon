import { ethers } from "hardhat";

const contractAddress = '0x250ad80574bf9733713A8cB38769F91264D7C5e1'

// MetaMask puclic key @maito1201
const toAddress = '0xcBe10B9C0554ae99D9ec5d64e3E2F900615670dE'

async function main() {
  const PMT = await ethers.getContractFactory("PMToken");
  const token = await PMT.attach(contractAddress)
  for (let i = 1; i <=100; i++) {
    const log = await token.safeMint(toAddress, `https://depod-nft.s3.ap-northeast-1.amazonaws.com/${i}.json`)
    console.log(`token ${i} minted ${log.hash}`);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
