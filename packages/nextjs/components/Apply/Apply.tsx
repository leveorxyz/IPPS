import {
  Box,
  Heading,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  HStack,
  Stack,
  Textarea,
  Button,
  Icon,
  useBoolean,
  useToast,
} from '@chakra-ui/react';
import { MdArticle, MdDialpad, MdFilePresent, MdAddAPhoto } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { Web3Storage } from 'web3.storage';
import { useStakingLimitContract } from '../../hooks';
import { utils } from 'ethers';

interface RegisterData {
  currency: string;
  routingNumber: string;
  bankName: string;
  bankAddress: string;
  attachment: FileList;
  description: string;
  limit: string;
}

const Apply = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterData>();
  const [isLoading, setIsLoading] = useBoolean();
  const stakingLimitContract = useStakingLimitContract();
  const toast = useToast();

  const handleFormSubmit = async (data: RegisterData) => {
    setIsLoading.on();

    const client = new Web3Storage({ token: process.env.NEXT_PUBLIC_WEB3_STORAGE_KEY as string });
    const cid = await client.put([data.attachment[0]]);

    // https://bafybeighcjsg5meaxkrtfzhzjvf2rw4bzfrrky6clbuz6ufbmpfrc67y5q.ipfs.w3s.link/
    stakingLimitContract?.functions
      .register(
        utils.formatBytes32String(data.bankName),
        utils.formatBytes32String(data.routingNumber),
        utils.toUtf8Bytes(data.bankAddress),
        utils.toUtf8Bytes(cid)
      )
      .then((res) => {
        reset();
        toast({ status: 'success', description: 'Applied successfully!' });
      })
      .catch((err) => {
        toast({ status: 'error', description: err?.reason || err?.message });
      })
      .finally(() => {
        setIsLoading.off();
      });
  };

  return (
    <Box>
      <Heading size="sm" textTransform="uppercase">
        apply for enlistment
      </Heading>
      <SimpleGrid columns={[1, 2]} mt="5" gap={5}>
        <Stack gap={2} as="form" onSubmit={handleSubmit(handleFormSubmit)}>
          <HStack gap="3">
            <FormControl isInvalid={!!errors?.currency}>
              <FormLabel>Currency</FormLabel>
              <Select placeholder="Choose Currency" {...register('currency', { required: true })}>
                <option value="USD">USD</option>
                <option value="EURO">EURO</option>
              </Select>
            </FormControl>
            <FormControl isInvalid={!!errors?.routingNumber}>
              <FormLabel>Routing Number</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <MdDialpad color="gray.300" />
                </InputLeftElement>
                <Input
                  type="text"
                  placeholder="Enter Routing Number"
                  {...register('routingNumber', { required: true })}
                />
              </InputGroup>
            </FormControl>
          </HStack>
          <FormControl isInvalid={!!errors?.bankName}>
            <FormLabel>Bank Name</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <MdArticle color="gray.300" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Enter bank name"
                {...register('bankName', { required: true })}
              />
            </InputGroup>
          </FormControl>
          <FormControl isInvalid={!!errors?.bankAddress}>
            <FormLabel>Bank Address</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <MdArticle color="gray.300" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Enter bank address"
                {...register('bankAddress', { required: true })}
              />
            </InputGroup>
          </FormControl>
          <FormControl isInvalid={!!errors?.limit}>
            <FormLabel>Required Limit</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <MdArticle color="gray.300" />
              </InputLeftElement>
              <Input
                type="number"
                placeholder="Enter required limit"
                {...register('limit', { required: true })}
              />
            </InputGroup>
          </FormControl>
          <FormControl isInvalid={!!errors?.attachment}>
            <FormLabel>Attachment</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <MdFilePresent color="gray.300" />
              </InputLeftElement>
              <Input
                type="file"
                placeholder="Upload attachment"
                {...register('attachment', { required: true })}
              />
            </InputGroup>
          </FormControl>
          <FormControl isInvalid={!!errors?.description}>
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Type description"
              rows={4}
              {...register('description', { required: true })}
            />
          </FormControl>
          <Button variant="outline" type="submit" isLoading={isLoading}>
            Submit
          </Button>
        </Stack>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Box
            bg="linear-gradient(169.44deg, rgba(58, 129, 191, 0.08) 1.85%, rgba(65, 48, 90, 0.08) 98.72%)"
            borderRadius="xl"
            width="363px"
            height="442px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            border="1px solid"
            borderTopColor="#4274C4"
            borderRightColor="#52A3DD"
            borderBottomColor="#74F2C2"
            borderLeftColor="#B0FF93"
            position="relative"
          >
            <Icon as={MdAddAPhoto} fontSize="7xl" />
            <Box
              width="88px"
              height="88px"
              bg="#B0FF93"
              filter="blur(100px)"
              pos="absolute"
              bottom={0}
              right={0}
            />
            <Box
              width="88px"
              height="88px"
              bg="#4274C4"
              filter="blur(100px)"
              pos="absolute"
              top={0}
              left={0}
            />
          </Box>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default Apply;
