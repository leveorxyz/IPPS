import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Test Suite", async function () {

    async function deployCampaignInfoFactory() {

        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccounts] = await ethers.getSigners();

        const ContractRegistry = await ethers.getContractFactory("ContractRegistry");
        const contractRegistry = await ContractRegistry.deploy();

        const TokenFactory = await ethers.getContractFactory("TokenFactory");
        const tokenFactory = await TokenFactory.deploy();

        const ExchangeProtocol = await ethers.getContractFactory("ExchangeProtocol");
        const exchangeProtocol = await ExchangeProtocol.deploy();

        const StakingLimit = await ethers.getContractFactory("StakingLimit");
        const stakingLimit = await StakingLimit.deploy();

        const RewardPool = await ethers.getContractFactory("RewardPool");
        const rewardPool = await RewardPool.deploy();

        const Oracle = await ethers.getContractFactory("Oracle");
        const oracle = await Oracle.deploy();

        const UserRegistry = await ethers.getContractFactory("UserRegistry");
        const userRegistry = await UserRegistry.deploy();

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

        return { owner, otherAccounts, userRegistry, oracle, stakingLimit, exchangeProtocol, tokenFactory, contractRegistry };
    }

    describe("Contract Initialization", function () {

        it("Should set the right owner", async function () {
            const { owner, otherAccounts, userRegistry, oracle, stakingLimit, exchangeProtocol, tokenFactory, contractRegistry } = await loadFixture(deployCampaignInfoFactory);


            expect(await campaignInfoFactory.owner()).to.equal(owner.address);
        });

    });
});
