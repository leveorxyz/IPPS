import Link from 'next/link';
import { Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

type PropTypes = {
  text: string;
  link: string;
};

const MenuLink = ({ link, text }: PropTypes) => {
  const router = useRouter();

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
        className={`${
          router.pathname===link ? "text-black bg-gradient-to-r from-green-900 to-blue-600 shadow-lg" : ""
        } hover:bg-secondary hover:shadow-md focus:!bg-secondary active:!text-neutral py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col`}
      >
        {text}
      </Text>
    </Link>
  );
};

export default MenuLink;
