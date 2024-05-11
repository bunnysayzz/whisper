import React from "react";
import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { Container } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { RiLoader5Fill } from "react-icons/ri";
import { MdArrowForward } from "react-icons/md";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <Container maxW="xl" centerContent margin="auto">
      <Alert
        status="info"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="390px"
        bg="blue.800"
        color="white"
        borderRadius="16px"
        borderWidth="2px"
        borderColor="black"
        boxShadow="lg"
        transition="box-shadow 0.3s, background-color 0.3s"
        _hover={{ boxShadow: "xl", bg: "blue.700" }}
      >
        <AlertIcon as={RiLoader5Fill} boxSize="45px" color="yellow.300" />
        <AlertTitle mt={5} fontSize="3xl">
          Your chats are Loading <Spinner size="lg" color="yellow.300" ml="1" />
        </AlertTitle>
        <AlertDescription maxWidth="md">
          ( Still Loading. Click on the Button Below )
        </AlertDescription>
        <Button
          fontWeight="bold"
          variant="outline"
          colorScheme="yellow"
          mt={7}
          rightIcon={<MdArrowForward />}
          onClick={resetErrorBoundary}
          _hover={{ bg: "pink.500", color: "white" }}
          _active={{ bg: "pink.500", color: "white" }}
        >
          Continue Texting
        </Button>
      </Alert>
    </Container>
  );
}

export default ErrorFallback;
