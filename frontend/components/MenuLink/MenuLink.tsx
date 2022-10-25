import Link from 'next/link';
import { Text } from '@chakra-ui/react';

type PropTypes = {
  text: string;
  link: string;
};

const MenuLink = ({ link, text }: PropTypes) => {
  return (
    <Link href={link}>
      <Text
        borderBottom="1.5px solid transparent"
        textTransform="uppercase"
        fontWeight="bold"
        color="gray.100"
        _hover={{
          background: 'gradient.button',
          backgroundClip: 'text',
          borderBottom: '1.5px solid',
          borderBottomColor: 'blue.100',
        }}
      >
        {text}
      </Text>
    </Link>
  );
};

export default MenuLink;
