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
    address: '3J98****WNLy',
    amount: '12.23 USDT',
    lockedSince: '17 Jun 2022 08:59 pm',
    lockedUntil: '20 Jun 2022 12:59 pm',
  },
  {
    id: 2,
    name: 'Katherine Langford',
    address: '3J98****WNLy',
    amount: '12.23 USDT',
    lockedSince: '17 Jun 2022 08:59 pm',
    lockedUntil: '20 Jun 2022 12:59 pm',
  },
  {
    id: 3,
    name: 'Agatha Pricila',
    address: '3J98****WNLy',
    amount: '12.23 USDT',
    lockedSince: '17 Jun 2022 08:59 pm',
    lockedUntil: '20 Jun 2022 12:59 pm',
  },
  {
    id: 4,
    name: 'Emily Southgate',
    address: '3J98****WNLy',
    amount: '12.23 USDT',
    lockedSince: '17 Jun 2022 08:59 pm',
    lockedUntil: '20 Jun 2022 12:59 pm',
  },
  {
    id: 5,
    name: 'Alex Smith',
    address: '3J98****WNLy',
    amount: '12.23 USDT',
    lockedSince: '17 Jun 2022 08:59 pm',
    lockedUntil: '20 Jun 2022 12:59 pm',
  },
  {
    id: 6,
    name: 'Mike Hussey',
    address: '3J98****WNLy',
    amount: '12.23 USDT',
    lockedSince: '17 Jun 2022 08:59 pm',
    lockedUntil: '20 Jun 2022 12:59 pm',
  },
  {
    id: 7,
    name: 'Dan Abramov',
    address: '3J98****WNLy',
    amount: '12.23 USDT',
    lockedSince: '17 Jun 2022 08:59 pm',
    lockedUntil: '20 Jun 2022 12:59 pm',
  },
  {
    id: 8,
    name: 'Jonathon Byer',
    address: '3J98****WNLy',
    amount: '12.23 USDT',
    lockedSince: '17 Jun 2022 08:59 pm',
    lockedUntil: '20 Jun 2022 12:59 pm',
  },
  {
    id: 9,
    name: 'Millie Bobby',
    address: '3J98****WNLy',
    amount: '12.23 USDT',
    lockedSince: '17 Jun 2022 08:59 pm',
    lockedUntil: '20 Jun 2022 12:59 pm',
  },
  {
    id: 6,
    name: 'Max Mayfield',
    address: '3J98****WNLy',
    amount: '12.23 USDT',
    lockedSince: '17 Jun 2022 08:59 pm',
    lockedUntil: '20 Jun 2022 12:59 pm',
  },
];
