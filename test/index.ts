import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { getBytes32String, getBytesString } from "../lib/utils";


describe("Test Suite", async function () {

    async function deployAndInitializeContracts() {

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

        tx = await exchangeProtocol.initialize(contractRegistry.address);
        await tx.wait();
        tx = await oracle.initialize(contractRegistry.address);
        await tx.wait();
        tx = await tokenFactory.initialize(contractRegistry.address);
        await tx.wait();
        tx = await userRegistry.initialize(contractRegistry.address);
        await tx.wait();

        return { owner, otherAccounts, userRegistry, oracle, rewardPool, stakingLimit, exchangeProtocol, tokenFactory, contractRegistry };
    }

    describe("Contract Test", function () {
        it("Should create Token from TokenFactory using createToken function", async function () {
            const { owner, tokenFactory } = await loadFixture(deployAndInitializeContracts);

            let tx = await tokenFactory.createToken("USD", "");
            let result = await tx.wait();
            const newTokenAddress = result.events?.[1].args?.campaignInfoAddress;
            expect(newTokenAddress).to.not.equal("0x");
        });

        it.only("Should ", async function () {
            const { owner, bank, tokenFactory, stakingLimit } = await loadFixture(deployAndInitializeContracts);

            let tx = await tokenFactory.createToken("USD", "");
            let result = await tx.wait();
            const usdTokenAddress = result.events?.[1].args?.campaignInfoAddress;
            tx = await tokenFactory.createToken("EUR", "");
            result = await tx.wait();
            const eurTokenAddress = result.events?.[1].args?.campaignInfoAddress;

            const bankName = getBytes32String("Dutch Bank");
            const routingNumber = getBytes32String("29387983883");
            const bankAddress = getBytesString("City Street, Mount Avenue");
            const url = getBytesString("/SampleUrl");

            tx = await stakingLimit.connect(bank).register(bankName, routingNumber, bankAddress, url);
            await tx.wait();



            expect(0).to.equal(0);
        });

        it("Should ", async function () {
            const { owner, contractRegistry } = await loadFixture(deployAndInitializeContracts);

            let tx = await contractRegistry.setOracle();
            await tx.wait();
            let res = await contractRegistry.ORACLE();
            expect(0).to.equal(0);
        });

        it("Should ", async function () {
            const { owner, contractRegistry } = await loadFixture(deployCampaignInfoFactory);

            let tx = await contractRegistry.setStakingLimit();
            await tx.wait();
            let res = await contractRegistry.STAKING_LIMIT();
            expect(0).to.equal(0);
        });

        it("Should ", async function () {
            const { owner, contractRegistry } = await loadFixture(deployCampaignInfoFactory);

            let tx = await contractRegistry.setTokenFactory();
            await tx.wait();
            let res = await contractRegistry.TOKEN_FACTORY();
            expect(0).to.equal(0);
        });

        it.only("Should ", async function () {
            const { owner, contractRegistry } = await loadFixture(deployCampaignInfoFactory);

            let tx = await contractRegistry.setExchangeProtocol();
            await tx.wait();
            let res = await contractRegistry.EXCHANGE_PROTOCOL();
            expect(0).to.equal(0);
        });

        it("Should ", async function () {
            const { owner, contractRegistry } = await loadFixture(deployCampaignInfoFactory);

            let tx = await contractRegistry.setUserRegistry();
            await tx.wait();
            let res = await contractRegistry.USER_REGISTRY();
            expect(0).to.equal(0);
        });

        it("Should ", async function () {
            const { owner, contractRegistry } = await loadFixture(deployCampaignInfoFactory);

            let tx = await contractRegistry.setRewardPool();
            await tx.wait();
            let res = await contractRegistry.REWARD_POOL();
            expect(0).to.equal(0);
        });

        it("Should ", async function () {
            const { owner, exchangeProtocol } = await loadFixture(deployCampaignInfoFactory);

            let tx = await exchangeProtocol.transferToken();
            await tx.wait();
            expect(0).to.equal(0);
        });

        it("Should ", async function () {
            const { owner, oracle } = await loadFixture(deployCampaignInfoFactory);

            let price = await oracle.getAssetPriceInUSD();
            expect(0).to.equal(0);
        });

        it("Should ", async function () {
            const { owner, rewardPool } = await loadFixture(deployCampaignInfoFactory);

            let tx = await rewardPool.claimFeeShare();
            await tx.wait();
            expect(0).to.equal(0);
        });

        it("Should ", async function () {
            const { owner, stakingLimit } = await loadFixture(deployCampaignInfoFactory);

            let res = await stakingLimit.getStakerShareInCurrency();
            expect(0).to.equal(0);
        });

        it("Should ", async function () {
            const { owner, stakingLimit } = await loadFixture(deployCampaignInfoFactory);

            let res = await stakingLimit.getSupportedStablecoins();
            expect(0).to.equal(0);
        });

        it("Should ", async function () {
            const { owner, stakingLimit } = await loadFixture(deployCampaignInfoFactory);

            let res = await stakingLimit.getBankVerificationStatus();
            expect(0).to.equal(0);
        });

        it("Should ", async function () {
            const { owner, stakingLimit } = await loadFixture(deployCampaignInfoFactory);

            let res = await stakingLimit.getBankInfo();
            expect(0).to.equal(0);
        });

        it("Should ", async function () {
            const { owner, stakingLimit } = await loadFixture(deployCampaignInfoFactory);

            let res = await stakingLimit.getBankAppliedLimit();
            expect(0).to.equal(0);
        });

        it("Should ", async function () {
            const { owner, stakingLimit } = await loadFixture(deployCampaignInfoFactory);

            let res = await stakingLimit.getBankGrantedLimit();
            expect(0).to.equal(0);
        });

        it("Should ", async function () {
            const { owner, stakingLimit } = await loadFixture(deployCampaignInfoFactory);

            let tx = await stakingLimit.register();
            await tx.wait();
            expect(0).to.equal(0);
        });

        it("Should ", async function () {
            const { owner, stakingLimit } = await loadFixture(deployCampaignInfoFactory);

            let tx = await stakingLimit.verifyBank();
            await tx.wait();
            expect(0).to.equal(0);
        });

        it("Should ", async function () {
            const { owner, stakingLimit } = await loadFixture(deployCampaignInfoFactory);

            let tx = await stakingLimit.applyForLimit();
            await tx.wait();
            expect(0).to.equal(0);
        });

        it("Should ", async function () {
            const { owner, stakingLimit } = await loadFixture(deployCampaignInfoFactory);

            let tx = await stakingLimit.addStablecoin();
            await tx.wait();
            expect(0).to.equal(0);
        });

        it("Should ", async function () {
            const { owner, stakingLimit } = await loadFixture(deployCampaignInfoFactory);

            let tx = await stakingLimit.stakeForBank();
            await tx.wait();
            expect(0).to.equal(0);
        });

        it("Should ", async function () {
            const { owner, stakingLimit } = await loadFixture(deployCampaignInfoFactory);

            let tx = await stakingLimit.unstakeFromBank();
            await tx.wait();
            expect(0).to.equal(0);
        });


    });
});
