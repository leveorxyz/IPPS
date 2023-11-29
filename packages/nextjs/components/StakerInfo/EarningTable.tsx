import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Avatar,
  HStack,
  Button,
} from '@chakra-ui/react';
import Pagination from '../Pagination/Pagination';
import PageSize from './PageSize';
import TableFilter from './TableFilter';

const EarningTable = () => {
  return (
    <TableContainer mt={10}>
      <TableFilter title="My last 10 staking Info" />
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>Address</Th>
            <Th>Amount</Th>
            <Th>Locked Since</Th>
            <Th>Locked Until</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tableData.map((item) => (
            <Tr key={item.id}>
              <Td alignItems="center">
                <Avatar name={item.name} size="xs" /> {item.name}
              </Td>
              <Td>{item.amount}</Td>
              <Td>{item.lockedSince}</Td>
              <Td>{item.lockedUntil}</Td>
              <Td>
                <Button variant="outline" borderColor="red" size="sm" textColor="red">
                  unlock
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <HStack mt={5} justifyContent="space-between">
        <PageSize />
        <Pagination />
      </HStack>
    </TableContainer>
  );
};

export default EarningTable;

const tableData = [
  {
    id: 1,
    name: 'Bank of Baroda',
    amount: '12.23 USDT',
    lockedSince: '02 Nov 2022 08:59 pm',
    lockedUntil: '02 Dec 2022 08:59 pm',
  },
  {
    id: 2,
    name: 'Bank of India',
    amount: '02.57 USDT',
    lockedSince: '03 Nov 2022 02:01 pm',
    lockedUntil: '03 Dec 2022 02:01 pm',
  },
  {
    id: 3,
    name: 'Bank of Maharashtra',
    amount: '100.00 USDT',
    lockedSince: '05 Nov 2022 10:25 am',
    lockedUntil: '05 Dec 2022 10:25 am',
  },
  {
    id: 4,
    name: 'Canara Bank',
    amount: '45.89 USDT',
    lockedSince: '06 Nov 2022 09:25 pm',
    lockedUntil: '06 Dec 2022 09:25 pm',
  },
  {
    id: 5,
    name: 'Central Bank of India',
    amount: '90.00 USDT',
    lockedSince: '07 Nov 2022 04:48 pm',
    lockedUntil: '07 Dec 2022 04:48 pm',
  },
  {
    id: 6,
    name: 'Indian Bank',
    amount: '50.00 USDT',
    lockedSince: '09 Nov 2022 09:09 pm',
    lockedUntil: '09 Dec 2022 09:09 pm',
  },
  {
    id: 7,
    name: 'BASIC Bank Limited',
    amount: '500.00 USDT',
    lockedSince: '10 Nov 2022 6:25 am',
    lockedUntil: '10 Dec 2022 6:25 am',
  },
  {
    id: 8,
    name: 'Jamuna Bank Limited',
    amount: '1000.00 USDT',
    lockedSince: '11 Nov 2022 12:00 pm',
    lockedUntil: '11 Dec 2022 12:00 pm',
  },
  {
    id: 9,
    name: 'Uttara Bank Limited',
    amount: '567.00 USDT',
    lockedSince: '13 Nov 2022 07:34 am',
    lockedUntil: '13 Dec 2022 07:34 am',
  },
  {
    id: 10,
    name: 'Dutch Bank',
    amount: '67.00 USDT',
    lockedSince: '17 Nov 2022 10:10 pm',
    lockedUntil: '17 Dec 2022 10:10 pm',
  },
];
