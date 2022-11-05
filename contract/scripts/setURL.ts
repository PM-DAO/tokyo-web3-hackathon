import { ethers } from "hardhat";

const contractAddress = '0x250ad80574bf9733713A8cB38769F91264D7C5e1'

async function main() {
  const PMT = await ethers.getContractFactory("PMToken");
  const token = await PMT.attach(contractAddress)

  // oroginal songs
  const urls = ['https://www.youtube.com/watch?v=5iXU2oxTQJk', 'https://www.youtube.com/watch?v=ngt7PGF1kys', 'https://www.youtube.com/watch?v=cdUz2xwkVak']
  
  const donateAmount = 100000
  const tokenIdStart = 0
  const tokenIdEnd = 2
  for (let i = tokenIdStart; i <=tokenIdEnd; i++) {
    const log = await token.setContentURI(i, urls[i % 3], { value: donateAmount})
    console.log(`token ${i} setURL ${log.hash} url ${urls[i % 3]}`);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
