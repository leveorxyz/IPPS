import { useContract, useProvider, useSigner } from 'wagmi';
import stakingLimitABI from '../abi/StakingLimit.json';

export const useStakingLimitContract = () => {
  const { data: signer } = useSigner();

  return useContract({
    address: '0xC4a02607C93d5c42Ce45317d7B4025fC5a3dda0e',
    abi: stakingLimitABI,
    signerOrProvider: signer,
  });
};
