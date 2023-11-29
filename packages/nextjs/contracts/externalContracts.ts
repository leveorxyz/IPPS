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
        address: "0xB451A4018dd808763185931F506360a0c4484AA3",
        abi: userRegistry.abi
    },
    testEURT: {
        address: "0xDacC06341536A6E205e81b8d652633a20216CcbC",
        abi: erc20ABI
    },
    stakingLimit: {
        address: "0x3ee73C3c9306B6F885759e89985f70db5d7fE8D5",
        abi: stakingLimit.abi
    },
    exchangeProtocol: {
        address: "0x4A911d27bf71511D2077E66928c04E39badbd473",
        abi: exchangeProtocol.abi
    }

} as const;

export default externalContracts satisfies GenericContractsDeclaration;
