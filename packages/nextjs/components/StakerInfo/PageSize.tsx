import { HStack, Text, Select } from '@chakra-ui/react';
const PageSize = () => {
  return (
    <HStack>
      <Text>Showing max of </Text>
      <Select maxW="70" size="sm">
        <option value="10">10</option>
        <option value="10">20</option>
        <option value="10">40</option>
      </Select>
      <Text>items per page </Text>
    </HStack>
  );
};

export default PageSize;
