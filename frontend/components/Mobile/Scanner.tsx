import {
  Box,
  Center,
  Flex,
  Text,
  IconButton,
  useBoolean,
  Button,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { MdQrCodeScanner } from 'react-icons/md';
import { QrReader } from 'react-qr-reader';
import { useDemoContract } from '../../hooks';

const Scanner = () => {
  const [scan, setScan] = useBoolean(false);
  const [result, setResult] = useState('');
  const stakingLimitContract = useDemoContract();
  const toast = useToast();
  const ref = useRef<any>(null);

  const handleResult = (res: any) => {
    if (res?.text) {
      setResult(res.text);
    }
  };

  useEffect(() => {
    if (result) {
      try {
        stakingLimitContract?.functions
          .transfer()
          .then((res) => {
            toast({ status: 'success', description: 'Success!' });
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            ref.current?.stopCamera();
            setScan.off();
            setResult('');
          });
      } catch (error) {
        console.log(error);
      }
    }
    // eslint-disable-next-line
  }, [result]);

  return (
    <Center>
      {scan ? (
        <Box textAlign="center">
          <Box
            as={QrReader}
            ref={ref}
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
