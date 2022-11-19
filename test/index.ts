import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect, assert } from "chai";
import { ethers } from "hardhat";
import { getBytes32String, getBytesString } from "../lib/utils";

describe("Test Suite", async function () {

    async function deployAndInitializeContracts() {

        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount, bank, staker, merchant, bankAccountHolder1, bankAccountHolder2] = await ethers.getSigners();

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

        // Deploy test USDT contract - this will be used to simulate stablecoin USDT for testnet

        const TestUSDT = await ethers.getContractFactory("TestUSDT");
        const testUSDT = await TestUSDT.deploy();

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

        return { owner, otherAccount, bank, staker, merchant, bankAccountHolder1, bankAccountHolder2, userRegistry, oracle, rewardPool, stakingLimit, exchangeProtocol, tokenFactory, contractRegistry, testUSDT };
    }

    describe("#createToken", async function () {
        describe("failure", async function () {
            it("should revert if caller is not an owner", async function () {
                const { otherAccount , tokenFactory } = await loadFixture(deployAndInitializeContracts);
                const currency = "USD";
                await expect(tokenFactory.connect(otherAccount).createToken(currency, "")).to.be.reverted;
            })
        })
        describe("success", async function () {
            it("should create a token from factory", async function() {
                const { owner, tokenFactory } = await loadFixture(deployAndInitializeContracts);
                const currency1 = "USD";
                let tx = await tokenFactory.connect(owner).createToken(currency1, "");
                const result = await tx.wait();
                const currency1AddressFromFactory = await tokenFactory.getToken(currency1);
                await expect(currency1AddressFromFactory).to.not.equal("0x0");
            })
        })
    })

    describe("#registerBank", async function () {
        describe("success", async function () {
            it("should register a bank", async function() {
                const { bank, stakingLimit } = await loadFixture(deployAndInitializeContracts);

                const bankName = getBytes32String("Dutch Bank");
                const routingNumber = getBytes32String("29387983883");
                const bankAddress = getBytesString("City Street, Mount Avenue");
                const url = getBytesString("/SampleUrl");
                
                let tx = await stakingLimit.connect(bank).register(bankName, routingNumber, bankAddress, url);
                await tx.wait();
                const bankInfo = await stakingLimit.getBankInfo(bank.address);
                expect(bankInfo[0]).to.equal(bankName);
            })
        })
        describe("failure", async function () {
            it("should not register if already registered", async function() {
                const { bank, stakingLimit } = await loadFixture(deployAndInitializeContracts);

                const bankName = getBytes32String("Dutch Bank");
                const routingNumber = getBytes32String("29387983883");
                const bankAddress = getBytesString("City Street, Mount Avenue");
                const url = getBytesString("/SampleUrl");
    
                let tx = await stakingLimit.connect(bank).register(bankName, routingNumber, bankAddress, url);
                await tx.wait();
                await expect(stakingLimit.connect(bank).register(bankName, routingNumber, bankAddress, url)).to.be.reverted;
                ;
            })
        })
    })

    describe("#verifyBank", async function () {
        describe("failure", async function () {
            it("should revert if caller is not an owner", async function () {
                const { bank, otherAccount, stakingLimit } = await loadFixture(deployAndInitializeContracts);

                const bankName = getBytes32String("Dutch Bank");
                const routingNumber = getBytes32String("29387983883");
                const bankAddress = getBytesString("City Street, Mount Avenue");
                const url = getBytesString("/SampleUrl");
    
                await stakingLimit.connect(bank).register(bankName, routingNumber, bankAddress, url);
                await expect(stakingLimit.connect(otherAccount).verifyBank(otherAccount.address)).to.be.reverted;
            })
        })

        describe("success", async function () {
            it.only("should successfully verify bank", async function () {
                const { bank, owner, stakingLimit, userRegistry } = await loadFixture(deployAndInitializeContracts);

                const bankName = getBytes32String("Dutch Bank");
                const routingNumber = getBytes32String("29387983883");
                const bankAddress = getBytesString("City Street, Mount Avenue");
                const url = getBytesString("/SampleUrl");
    
                await stakingLimit.connect(bank).register(bankName, routingNumber, bankAddress, url);
                await stakingLimit.verifyBank(bank.address);
               // const confirm = await userRegistry.getUserStatus(bank.address);
                //console.log("confirm" + confirm);
           })
        })
    })

    describe("#applyForLimit", async function () {
        describe("failure", async function () {
            it("should revert if not verified before applying for limit", async function () {
                const { bank, owner, stakingLimit, userRegistry } = await loadFixture(deployAndInitializeContracts);

                const bankName = getBytes32String("Dutch Bank");
                const routingNumber = getBytes32String("29387983883");
                const bankAddress = getBytesString("City Street, Mount Avenue");
                const url = getBytesString("/SampleUrl");
    
                await stakingLimit.connect(bank).register(bankName, routingNumber, bankAddress, url);                const currency = "USD";
                //const currency = "USD";
                const amount = 100000*(10**18);
                await expect(stakingLimit.connect(bank).applyForLimit("USD", amount)).to.be.reverted;
            })
        })
        describe("success", async function () {
            it("should be successful in applying for limit", async function () {
                const { bank, owner, stakingLimit } = await loadFixture(deployAndInitializeContracts);

                const bankName = getBytes32String("Dutch Bank");
                const routingNumber = getBytes32String("29387983883");
                const bankAddress = getBytesString("City Street, Mount Avenue");
                const url = getBytesString("/SampleUrl");
    
                await stakingLimit.connect(bank).register(bankName, routingNumber, bankAddress, url);                const currency = "USD";
                //const currency = "USD";
                const amount = 100000*(10**18);
                await stakingLimit.verifyBank(owner.address);
                await stakingLimit.connect(bank).applyForLimit("USD", amount);
                const result = stakingLimit.getBankAppliedLimit(bank.address, currency);
                expect(result).to.equal(amount);

            }) 
        })
    })

    describe("#stakeForBank", async function () {
        describe("failure", async function() {
            it("should revert if asset is not added in accepted stablecoin list", async function () {
                const { bank, staker, owner, stakingLimit, testUSDT } = await loadFixture(deployAndInitializeContracts);

                const bankName = getBytes32String("Dutch Bank");
                const routingNumber = getBytes32String("29387983883");
                const bankAddress = getBytesString("City Street, Mount Avenue");
                const url = getBytesString("/SampleUrl");
    
                await stakingLimit.connect(bank).register(bankName, routingNumber, bankAddress, url);                const currency = "USD";
                //const currency = "USD";
                const amount = 100000*(10**18);
                await stakingLimit.verifyBank(owner.address);
                await stakingLimit.connect(bank).applyForLimit("USD", amount);
                const result = stakingLimit.getBankAppliedLimit(bank.address, currency);                
                
                // Mint test USDT - required to simulate USDT/ stablecoin staking in favour of banks applied limits.
                await testUSDT.mint(staker.address, stakedAmount + 1000);
                
                // Approve test USDT - required by the StakingLimit contract to transfer tokens
                let tx = await testUSDT.connect(staker).approve(stakingLimit.address, stakedAmount + 1000);
                await expect(stakingLimit.connect(staker).stakeForBank(bank.address, "USD", stakedAmount)).to.be.reverted;
            })
        })
        describe("success", async function () {
            it("should be able to stake asset that's accepted in the protocol", async function () {
                expect(0).to.equal(0);
            })
        })
    })

    describe("#transferFrom", async function () {
        describe("failure", async function () {
            it("should not transfer from account holder/user's wallet", async function () {

            })
            it("should not transfer to addresses which are not whitelisted", async function () {

            })
        })
        describe("success", async function () {
            it("should transfer from account to whitelisted addresses", async function () {

            })
            it("should burn USD from senders account and mint EUR to recipient's account", async function() {

            })
        })
    })

    describe("#claimFeeShare", async function () {
        describe("failure", async function () {
            it("should not claim fees if claimer has not staked", async function () {

            })
            it("should not be able to claim amount that doesn't belong to claimer's share", async function () {

            })
        })
        describe("success", async function () {
            it("should claim fee share amount", async function () {

            })
            it("should transfer the fee share to claimers account wallet", async function () {

            })
        })
    })


    describe("Contract Test", function () {
        it("Should create Token from TokenFactory using createToken function", async function () {
            const { owner, tokenFactory } = await loadFixture(deployAndInitializeContracts);

            let tx = await tokenFactory.createToken("USD", "");
            let result = await tx.wait();
            //console.log(result);
            const newTokenAddress = result.events?.[1].args?.campaignInfoAddress;
            expect(newTokenAddress).to.not.equal("0x");
        });

        it("Should ", async function () {
            const { owner, bank, staker, merchant, bankAccountHolder1, bankAccountHolder2, userRegistry, oracle, rewardPool, stakingLimit, exchangeProtocol, tokenFactory, contractRegistry, testUSDT } = await loadFixture(deployAndInitializeContracts);

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

            tx = await stakingLimit.verifyBank(bank.address)
            await tx.wait();

            const limit = 100000;

            tx = await stakingLimit.connect(bank).applyForLimit("USD", limit);
            await tx.wait();

            const stakedAmount = 10000;

            // Mint test USDT - required to simulate USDT/ stablecoin staking in favour of banks applied limits.
            tx = await testUSDT.mint(staker.address, stakedAmount + 1000);
            await tx.wait();

            
            // Approve test USDT - required by the StakingLimit contract to transfer tokens
            tx = await testUSDT.connect(staker).approve(stakingLimit.address, stakedAmount + 1000);
            await tx.wait();

            tx = await stakingLimit.connect(staker).stakeForBank(bank.address, "USD", stakedAmount);
            await tx.wait();

            tx = await userRegistry.connect(bank).setUserStatus(bankAccountHolder1.address, "ACCOUNT_HOLDER");
            await tx.wait();

            tx = await userRegistry.connect(bank).setUserStatus(merchant.address, "MERCHANT");
            await tx.wait();

            tx = await exchangeProtocol.connect(bank).mintTokenToAccount(bankAccountHolder1.address, "USD", 1000);
            await tx.wait();

            tx = await exchangeProtocol.transferToken(usdTokenAddress, eurTokenAddress, merchant.address, 500);
            await tx.wait();

            expect(0).to.equal(0);
        });
    });
});
