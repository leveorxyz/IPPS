import ReactPaginate from 'react-paginate';
import { Icon } from '@chakra-ui/react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

const Pagination = () => {
  return (
    <ReactPaginate
      className="pagination-container"
      pageClassName="pagination-item"
      breakLabel="..."
      nextLabel={<Icon as={RiArrowRightSLine} fontSize="20" color="white" mt="2" />}
      pageRangeDisplayed={3}
      pageCount={3}
      previousLabel={<Icon as={RiArrowLeftSLine} fontSize="20" color="white" mt="2" />}
    />
  );
};

export default Pagination;
