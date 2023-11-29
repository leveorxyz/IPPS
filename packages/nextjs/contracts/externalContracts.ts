import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";
import { erc20ABI } from 'wagmi'
import userRegistry from "../../hardhat/artifacts/contracts/UserRegistry.sol/UserRegistry.json";
import stakingLimit from "../../hardhat/artifacts/contracts/StakingLimit.sol/StakingLimit.json";
import exchangeProtocol from "../../hardhat/artifacts/contracts/ExchangeProtocol.sol/ExchangeProtocol.json";
/**
 * @example
 * const externalContracts = {
 *   1: {
 *     DAI: {
 *      address: "0x...",
 *      abi: [...],
 *    }
 * } as const;
 */
const externalContracts = {
    USDT: {
        address: "0x6175a8471C2122f778445e7E07A164250a19E661",
        abi: erc20ABI,
    },
    UserRegistry: {
        address: "0x06CE017135c759524Ec460115a38c28C9352D5dA",
        abi: userRegistry.abi
    },
    TestEURT: {
        address: "0xf31272C86F0e55C5746a570DbF27B8B4DBa6075f",
        abi: erc20ABI
    },
    StakingLimit: {
        address: "0x5c690dE7F98F16628aa431c829fe5Ecb26b0aaf9",
        abi: stakingLimit.abi
    },
    ExchangeProtocol: {
        address: "0x56D867D6A734d06273e8bcf5Fe0d053d400976b1",
        abi: exchangeProtocol.abi
    }

} as const;

export default externalContracts satisfies GenericContractsDeclaration;
