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
} from '@chakra-ui/react';
import { MdArticle, MdDialpad, MdFilePresent, MdAddAPhoto } from 'react-icons/md';

const Apply = () => {
  return (
    <Box>
      <Heading size="sm" textTransform="uppercase">
        apply for enlistment
      </Heading>
      <SimpleGrid columns={[1, 2]} mt="5" gap={5}>
        <Stack gap={2} as="form">
          <FormControl>
            <FormLabel>Account Name</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <MdArticle color="gray.300" />
              </InputLeftElement>
              <Input type="text" placeholder="Enter account name" />
            </InputGroup>
          </FormControl>
          <HStack gap="3">
            <FormControl>
              <FormLabel>Currency</FormLabel>
              <Select placeholder="Choose Currency">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Routing Number</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <MdDialpad color="gray.300" />
                </InputLeftElement>
                <Input type="text" placeholder="Enter Routing Number" />
              </InputGroup>
            </FormControl>
          </HStack>
          <FormControl>
            <FormLabel>Bank Name</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <MdArticle color="gray.300" />
              </InputLeftElement>
              <Input type="text" placeholder="Enter bank name" />
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel>Bank Address</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <MdArticle color="gray.300" />
              </InputLeftElement>
              <Input type="text" placeholder="Enter bank address" />
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel>Attachment</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <MdFilePresent color="gray.300" />
              </InputLeftElement>
              <Input type="file" placeholder="Upload attachment" />
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea placeholder="Type description" rows={4} />
          </FormControl>
          <Button variant="outline">Submit</Button>
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
