import { ethers } from "hardhat";
import { ContractRegistry, TokenFactory, ExchangeProtocol, StakingLimit, RewardPool, Oracle, UserRegistry, TestUSDT, TestEURT } from "../typechain-types";
import fs from 'fs';
import path from 'path';



async function main() {
  const contractDetailsDataPath = path.join(__dirname, "../", "../", "nextjs", "contracts", "externalAddresses.json");
  const jsonData = fs.readFileSync(contractDetailsDataPath, 'utf8');
  const jsonObject = JSON.parse(jsonData);

  const ContractRegistry = await ethers.getContractFactory("ContractRegistry");
  const contractRegistry: ContractRegistry = await ContractRegistry.deploy();
  console.log(`ContractRegistry deployed to ${contractRegistry.address}`);
  jsonObject.contractRegistry = contractRegistry.address;
  const TokenFactory = await ethers.getContractFactory("TokenFactory");
  const tokenFactory: TokenFactory = await TokenFactory.deploy();
  console.log(`TokenFactory deployed to ${tokenFactory.address}`);
  jsonObject.tokenFactory = tokenFactory.address;


  const ExchangeProtocol = await ethers.getContractFactory("ExchangeProtocol");
  const exchangeProtocol: ExchangeProtocol = await ExchangeProtocol.deploy();
  console.log(`ExchangeProtocol deployed to ${exchangeProtocol.address}`);
  jsonObject.exchangeProtocol = exchangeProtocol.address;


  const StakingLimit = await ethers.getContractFactory("StakingLimit");
  const stakingLimit: StakingLimit = await StakingLimit.deploy();
  console.log(`StakingLimit deployed to ${stakingLimit.address}`);
  jsonObject.stakingLimit = stakingLimit.address;


  const RewardPool = await ethers.getContractFactory("RewardPool");
  const rewardPool: RewardPool = await RewardPool.deploy();
  console.log(`RewardPool deployed to ${rewardPool.address}`);
  jsonObject.rewardPool = rewardPool.address;


  const Oracle = await ethers.getContractFactory("Oracle");
  const oracle: Oracle = await Oracle.deploy();
  console.log(`Oracle deployed to ${oracle.address}`);
  jsonObject.oracle = rewardPool.oracle;


  const UserRegistry = await ethers.getContractFactory("UserRegistry");
  const userRegistry: UserRegistry = await UserRegistry.deploy();
  console.log(`UserRegistry deployed to ${userRegistry.address}`);
  jsonObject.userRegistry = userRegistry.address;


  // Deploy test USDT contract - this will be used to simulate stablecoin USDT for testnet

  // const TestUSDT = await ethers.getContractFactory("TestUSDT");
  // const testUSDT: TestUSDT = await TestUSDT.deploy();
  // console.log(`TestUSDT deployed to ${testUSDT.address}`);

  const TestEURT = await ethers.getContractFactory("TestEURT");
  const testEURT: TestUSDT = await TestEURT.deploy();
  console.log(`TestEURT deployed to ${testEURT.address}`);
  jsonObject.testEURT = testEURT.address;
  const updatedJsonData = JSON.stringify(jsonObject, null, 2);
  fs.writeFileSync(contractDetailsDataPath, updatedJsonData, 'utf8');

  await contractRegistry.setExchangeProtocol(exchangeProtocol.address);
  await contractRegistry.setOracle(oracle.address);
  await contractRegistry.setStakingLimit(stakingLimit.address);
  await contractRegistry.setTokenFactory(tokenFactory.address);
  await contractRegistry.setUserRegistry(userRegistry.address);
  await contractRegistry.setRewardPool(rewardPool.address);

  await exchangeProtocol.initialize(contractRegistry.address);
  await oracle.initialize(contractRegistry.address);
  await stakingLimit.initialize(contractRegistry.address);
  await tokenFactory.initialize(contractRegistry.address);
  await userRegistry.initialize(contractRegistry.address);

  console.log("Initialized");

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
