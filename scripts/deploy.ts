import { ethers } from "hardhat";

async function main() {

  const ContractRegistry = await ethers.getContractFactory("ContractRegistry");
  const contractRegistry = await ContractRegistry.deploy();

  // Deploy ContractRegistry
  await contractRegistry.deployed();

  console.log(`ContractRegistry deployed to ${contractRegistry.address}`);

  const TokenFactory = await ethers.getContractFactory("TokenFactory");
  const tokenFactory = await TokenFactory.deploy();
  
  // Deploy TokenFactory
  await tokenFactory.deployed();

  console.log(`TokenFactory deployed to ${tokenFactory.address}`);

  const ExchangeProtocol = await ethers.getContractFactory("ExchangeProtocol");
  const exchangeProtocol = await ExchangeProtocol.deploy();

  // Deploy ExchangeProtocol
  await exchangeProtocol.deployed();

  console.log(`ExchangeProtocol deployed to ${exchangeProtocol.address}`);

  const StakingLimit = await ethers.getContractFactory("StakingLimit");
  const stakingLimit = await StakingLimit.deploy();

  // Deploy StakingLimit
  await stakingLimit.deployed();

  console.log(`StakingLimit deployed to ${stakingLimit.address}`);

  const RewardPool = await ethers.getContractFactory("RewardPool");
  const rewardPool = await RewardPool.deploy();

  // Deploy RewardPool
  await rewardPool.deployed();

  console.log(`RewardPool deployed to ${rewardPool.address}`);
 
  const Oracle = await ethers.getContractFactory("Oracle");
  const oracle = await Oracle.deploy();

  // Deploy Oracle
  await oracle.deployed();

  console.log(`Oracle deployed to ${oracle.address}`);
  
  const UserRegistry = await ethers.getContractFactory("UserRegistry");
  const userRegistry = await UserRegistry.deploy();

  // Deploy UserRegistry
  await userRegistry.deployed();

  console.log(`UserRegistry deployed to ${userRegistry.address}`);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
