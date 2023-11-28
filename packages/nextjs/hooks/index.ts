import { useContract, useSigner } from 'wagmi';
import stakingLimitABI from '../abi/StakingLimit.json';
import demoABI from '../abi/TestABI.json';

export const useStakingLimitContract = () => {
  const { data: signer } = useSigner();

  return useContract({
    address: '0x77B2376CE1bC580BAc3181a94Afab45a6bCad99d',
    abi: stakingLimitABI,
    signerOrProvider: signer,
  });
};

export const useDemoContract = () => {
  const { data: signer } = useSigner();

  return useContract({
    address: '0xC4a02607C93d5c42Ce45317d7B4025fC5a3dda0e',
    abi: demoABI,
    signerOrProvider: signer,
  });
};
