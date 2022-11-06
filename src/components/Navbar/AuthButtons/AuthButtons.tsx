import { useState, Fragment } from "react";
import { Button, HStack } from "@chakra-ui/react";

import SignupModal from "components/Authenticate/SignupModal";

const AuthButtons = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [defaultTab, setDefaultTab] = useState(0);

  return (
    <Fragment>
      <HStack>
        <Button
          onClick={() => {
            setDefaultTab(1);
            setAuthModalOpen(true);
          }}
          variant="ghost"
          size="sm"
        >
          Log In
        </Button>

        <Button
          onClick={() => {
            setDefaultTab(0);
            setAuthModalOpen(true);
          }}
          size="sm"
          variant="solid-blue"
        >
          Sign Up
        </Button>
      </HStack>

      {authModalOpen && (
        <SignupModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          defaultTab={defaultTab}
        />
      )}
    </Fragment>
  );
};

export default AuthButtons;
