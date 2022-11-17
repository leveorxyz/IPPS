import { Text, HStack, Input, Flex, Icon } from '@chakra-ui/react';
import { MdCalendarToday } from 'react-icons/md';

interface IProps {
  title?: string;
}

const TableFilter = ({ title }: IProps) => {
  return (
    <HStack justifyContent="space-between" mb={3}>
      <Text>{title ?? 'Last 10 staker info'}</Text>
      <Flex gap={10}>
        <HStack>
          <Icon as={MdCalendarToday} />
          <Text>start date</Text>
          <Input type="date" variant="flushed" size="sm" color="white" fontWeight="bold" />
        </HStack>
        <HStack>
          <Icon as={MdCalendarToday} />
          <Text>end date</Text>
          <Input type="date" variant="flushed" size="sm" color="white" fontWeight="bold" />
        </HStack>
      </Flex>
    </HStack>
  );
};

export default TableFilter;
