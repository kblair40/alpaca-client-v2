import { useState, Fragment } from "react";
import { Button, HStack } from "@chakra-ui/react";

import SignupModal from "components/Authenticate/SignupModal";

const AuthButtons = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <Fragment>
      <HStack>
        <Button variant="ghost" size="sm">
          Log In
        </Button>
        <Button size="sm">Sign Up</Button>
      </HStack>

      {authModalOpen && (
        <SignupModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
        />
      )}
    </Fragment>
  );
};

export default AuthButtons;
