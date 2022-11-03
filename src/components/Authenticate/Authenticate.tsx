import React, { useState } from "react";
import { Box, Flex, Text, Button, Center } from "@chakra-ui/react";

import SignupModal from "./SignupModal";

const Authenticate = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <React.Fragment>
      <Center
        h="calc(100vh - 60px)"
        // border="1px solid white"
      >
        <Button variant="solid-blue" onClick={() => setShowModal(true)}>
          Sign In / Sign Up
        </Button>
      </Center>

      {showModal && (
        <SignupModal isOpen={showModal} onClose={() => setShowModal(false)} />
      )}
    </React.Fragment>
  );
};

export default Authenticate;
