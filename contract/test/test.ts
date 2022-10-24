import { expect } from "chai"
import { ethers } from "hardhat"
import { Contract } from "ethers"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"


const contractName = "PMToken"
const dummyURL = "http://example.com"

describe("Token contract", function () {
  let contract: Contract
  let owner: SignerWithAddress
  let addr1: SignerWithAddress
  let addr2: SignerWithAddress
  let addrs: SignerWithAddress[]
    
  beforeEach(async () => {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners()
    const factory = await ethers.getContractFactory(contractName)
    contract = await factory.deploy()
  })

  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const ownerBalance = await contract.balanceOf(owner.address)
    expect(await contract.totalSupply()).to.equal(ownerBalance)
  })

  it("safesafeMint success", async function () {
    expect(await contract.totalSupply()).to.equal(0)
    await contract.safeMint(owner.address, dummyURL)
    expect(await contract.totalSupply()).to.equal(1)
  })

  it("safeMint is onlyOwner", async function () {
    expect(await contract.totalSupply()).to.equal(0)
    await expect(contract.connect(addr1).safeMint(addr1.address, dummyURL)).to.be.reverted
    expect(await contract.totalSupply()).to.equal(0)
  })

  it("fauset", async function () {
    const donateAmount = ethers.utils.parseEther('1')
    const invalidAmount = ethers.utils.parseEther('2')
    const faucetAmount = ethers.utils.parseEther('0.1')

    await contract.donateTofaucet({value: donateAmount})
    expect(await contract.getBalance()).to.equal(BigInt(1000000000000000000))

    expect(contract.connect(addr1).faucet(invalidAmount)).to.be.revertedWith("Not enough funds in the contract. donate required")
    expect(await addr1.getBalance()).to.not.greaterThan(BigInt(10000000000000000000000))
    expect(await contract.connect(addr1).faucet(faucetAmount)).to.not.be.reverted
    expect(await contract.getBalance()).to.equal(BigInt(900000000000000000))
    expect(await addr1.getBalance()).to.greaterThan(BigInt(10000000000000000000000))
    expect(contract.connect(addr1).faucet(faucetAmount)).to.be.revertedWith("lock time has not expired. Please try again later")
  })
})
