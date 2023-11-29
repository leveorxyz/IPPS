import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";
import { erc20ABI } from 'wagmi'
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
} as const;

export default externalContracts satisfies GenericContractsDeclaration;
