import { ethers } from "hardhat";
import { ContractRegistry, TokenFactory, ExchangeProtocol, StakingLimit, RewardPool, Oracle, UserRegistry, TestUSDT } from "../typechain-types";

async function main() {

  const ContractRegistry = await ethers.getContractFactory("ContractRegistry");
  const contractRegistry: ContractRegistry = await ContractRegistry.deploy();
  console.log(`ContractRegistry deployed to ${contractRegistry.address}`);

  const TokenFactory = await ethers.getContractFactory("TokenFactory");
  const tokenFactory: TokenFactory = await TokenFactory.deploy();
  console.log(`TokenFactory deployed to ${tokenFactory.address}`);

  const ExchangeProtocol = await ethers.getContractFactory("ExchangeProtocol");
  const exchangeProtocol: ExchangeProtocol = await ExchangeProtocol.deploy();
  console.log(`ExchangeProtocol deployed to ${exchangeProtocol.address}`);

  const StakingLimit = await ethers.getContractFactory("StakingLimit");
  const stakingLimit: StakingLimit = await StakingLimit.deploy();
  console.log(`StakingLimit deployed to ${stakingLimit.address}`);

  const RewardPool = await ethers.getContractFactory("RewardPool");
  const rewardPool: RewardPool = await RewardPool.deploy();
  console.log(`RewardPool deployed to ${rewardPool.address}`);

  const Oracle = await ethers.getContractFactory("Oracle");
  const oracle: Oracle = await Oracle.deploy();
  console.log(`Oracle deployed to ${oracle.address}`);

  const UserRegistry = await ethers.getContractFactory("UserRegistry");
  const userRegistry: UserRegistry = await UserRegistry.deploy();
  console.log(`UserRegistry deployed to ${userRegistry.address}`);

  // Deploy test USDT contract - this will be used to simulate stablecoin USDT for testnet

  const TestUSDT = await ethers.getContractFactory("TestUSDT");
  const testUSDT: TestUSDT = await TestUSDT.deploy();
  console.log(`TestUSDT deployed to ${testUSDT.address}`);

  let tx = await contractRegistry.setExchangeProtocol(exchangeProtocol.address);
  await tx.wait();
  tx = await contractRegistry.setOracle(oracle.address);
  await tx.wait();
  tx = await contractRegistry.setStakingLimit(stakingLimit.address);
  await tx.wait();
  tx = await contractRegistry.setTokenFactory(tokenFactory.address);
  await tx.wait();
  tx = await contractRegistry.setUserRegistry(userRegistry.address);
  await tx.wait();
  tx = await contractRegistry.setRewardPool(rewardPool.address);
  await tx.wait();

  tx = await exchangeProtocol.initialize(contractRegistry.address);
  await tx.wait();
  tx = await oracle.initialize(contractRegistry.address);
  await tx.wait();
  tx = await stakingLimit.initialize(contractRegistry.address);
  await tx.wait();
  tx = await tokenFactory.initialize(contractRegistry.address);
  await tx.wait();
  tx = await userRegistry.initialize(contractRegistry.address);
  await tx.wait();

  console.log("Initialized");

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
