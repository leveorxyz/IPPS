import { Text } from '@chakra-ui/react';

interface IProps {
  fontSize?: string | number;
}

const Logo = ({ fontSize }: IProps) => {
  return (
    <Text
      fontSize={fontSize}
      background="linear-gradient(93.51deg, #4274C4 2.84%, #B0FF93 99.18%)"
      backgroundClip="text"
      textTransform="uppercase"
      fontWeight="bold"
      letterSpacing="1.5px"
    >
      IPPS
    </Text>
  );
};

Logo.defaultProps = {
  fontSize: '32px',
};

export default Logo;
