import { Fragment } from "react";
import { Flex, Text, Center } from "@chakra-ui/react";

const Authenticate = () => {
  return (
    <Fragment>
      <Center
        h="100%"
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        w="100%"
        zIndex={1000}
      >
        <Flex
          flexDirection="column"
          align="center"
          w={{ base: "80vw", sm: "70vw", md: "50vw" }}
        >
          <Text textAlign="center" fontWeight={500} fontSize="lg" mb="1rem">
            You are not logged in.
          </Text>
          <Text textAlign="center">
            Click 'Sign Up' above to create an account or 'Log In' to sign in to
            existing account.
          </Text>
        </Flex>
      </Center>
    </Fragment>
  );
};

export default Authenticate;
