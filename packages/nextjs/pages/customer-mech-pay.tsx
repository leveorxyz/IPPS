import { Container, Heading, Stack, Text } from "@chakra-ui/react"
import Scanner from "~~/components/Mobile/Scanner";

const CustomerMerchPay = () => {
    return (
        <Container maxW="container.xl" py={10}>
            <Stack>
                <Heading>
                    Merchant Payment 
                </Heading>
                <Scanner/>
            </Stack>
        </Container>
    )
}

export default CustomerMerchPay;