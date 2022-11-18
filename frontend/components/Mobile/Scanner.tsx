import { Box, Center, Flex, Text, IconButton, useBoolean, Button } from '@chakra-ui/react';
import { MdQrCodeScanner } from 'react-icons/md';
import { QrReader } from 'react-qr-reader';

const Scanner = () => {
  const [scan, setScan] = useBoolean(false);

  const handleResult = (res: any) => {
    if (res?.text) {
      setScan.off();
    }
  };

  return (
    <Center>
      {scan ? (
        <Box textAlign="center">
          <Box
            as={QrReader}
            onResult={handleResult}
            width="257px"
            height="257px"
            constraints={{ facingMode: 'user' }}
          />
          <Button variant="outline" onClick={setScan.off}>
            Stop Scanning
          </Button>
        </Box>
      ) : (
        <Flex
          position="relative"
          width="257px"
          height="257px"
          backgroundImage="url('/images/QRCode.png')"
          backgroundSize="cover"
          justifyContent="center"
          alignItems="center"
        >
          <Flex
            position="absolute"
            width="60%"
            height="60%"
            borderRadius="full"
            bg="rgba(19, 34, 53, 0.95)"
            backdropFilter="blur(2px)"
            zIndex={2}
            justifyContent="center"
            alignItems="center"
          >
            <Text fontSize="2xl" fontWeight="bold" textAlign="center">
              45.65 <br /> USDT
            </Text>
          </Flex>

          <IconButton
            size="lg"
            icon={<MdQrCodeScanner />}
            fontSize="2xl"
            aria-label="Scan"
            position="absolute"
            zIndex={3}
            bottom="-5"
            right="-5"
            onClick={setScan.on}
          />
        </Flex>
      )}
    </Center>
  );
};

export default Scanner;
