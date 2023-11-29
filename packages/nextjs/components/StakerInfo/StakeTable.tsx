import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Avatar, HStack } from '@chakra-ui/react';
import Pagination from '../Pagination/Pagination';
import PageSize from './PageSize';
import TableFilter from './TableFilter';

const StakeTable = () => {
  return (
    <TableContainer mt={10}>
      <TableFilter />
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>Address</Th>
            <Th>Amount</Th>
            <Th>Locked Since</Th>
            <Th>Locked Until</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tableData.map((item) => (
            <Tr key={item.id}>
              <Td alignItems="center">
                <Avatar name={item.name} size="xs" /> {item.address}
              </Td>
              <Td>{item.amount}</Td>
              <Td>{item.lockedSince}</Td>
              <Td>{item.lockedUntil}</Td>
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

export default StakeTable;

const tableData = [
  {
    id: 1,
    name: 'John Doe',
    address: '0x8DfC****7DFAD',
    amount: '12.23 USDT',
    lockedSince: '16 Nov 2022 08:59 pm',
    lockedUntil: '16 Dec 2022 08:59 pm',
  },
  {
    id: 2,
    name: 'Katherine Langford',
    address: '0x4354****5c3f',
    amount: '02.57 USDT',
    lockedSince: '03 Nov 2022 02:01 pm',
    lockedUntil: '03 Dec 2022 02:01 pm',
  },
  {
    id: 3,
    name: 'Agatha Pricila',
    address: '0x4578****7b3s',
    amount: '100.00 USDT',
    lockedSince: '05 Nov 2022 10:25 am',
    lockedUntil: '05 Dec 2022 10:25 am',
  },
  {
    id: 4,
    name: 'Emily Southgate',
    address: '0x7894****6y5j',
    amount: '45.89 USDT',
    lockedSince: '06 Nov 2022 09:25 pm',
    lockedUntil: '06 Dec 2022 09:25 pm',
  },
  {
    id: 5,
    name: 'Alex Smith',
    address: '0x3456****6b9w',
    amount: '90.00 USDT',
    lockedSince: '07 Nov 2022 04:48 pm',
    lockedUntil: '07 Dec 2022 04:48 pm',
  },
  {
    id: 6,
    name: 'Mike Hussey',
    address: '0x2156****a685',
    amount: '50.00 USDT',
    lockedSince: '09 Nov 2022 09:09 pm',
    lockedUntil: '09 Dec 2022 09:09 pm',
  },
  {
    id: 7,
    name: 'Dan Abramov',
    address: '0x8906****6yt8',
    amount: '500.00 USDT',
    lockedSince: '10 Nov 2022 6:25 am',
    lockedUntil: '10 Dec 2022 6:25 am',
  },
  {
    id: 8,
    name: 'Jonathon Byer',
    address: '0x5580****a6u8',
    amount: '1000.00 USDT',
    lockedSince: '11 Nov 2022 12:00 pm',
    lockedUntil: '11 Dec 2022 12:00 pm',
  },
  {
    id: 9,
    name: 'Millie Bobby',
    address: '0xe244****788a',
    amount: '567.00 USDT',
    lockedSince: '13 Nov 2022 07:34 am',
    lockedUntil: '13 Dec 2022 07:34 am',
  },
  {
    id: 10,
    name: 'Max Mayfield',
    address: '0x0424****6u7o',
    amount: '67.00 USDT',
    lockedSince: '17 Nov 2022 10:10 pm',
    lockedUntil: '17 Dec 2022 10:10 pm',
  },
];
