import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue,
} from "@chakra-ui/react";

import AuthForm from "./AuthForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const SignupModal = ({ isOpen, onClose }: Props) => {
  const [tabIndex, setTabIndex] = useState(0);

  const themeDependentTabStyles = {
    _selected: {
      borderBottomColor: useColorModeValue("blue.600", "blue.400"),
    },
    // _active:
  };

  const defaultTabStyles = {
    borderBottom: "2px solid transparent",
    fontWeight: "600",
    fontSize: "lg",
  };

  const tabStyles = {
    ...themeDependentTabStyles,
    ...defaultTabStyles,
  };

  const modalBg = useColorModeValue("gray.50", "gray.800");

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent pt="1.5rem" bg={modalBg}>
        <ModalHeader textAlign="center" fontSize={"1.75rem"} fontWeight={600}>
          {tabIndex === 0 ? "Create an Account" : "Welcome Back"}
        </ModalHeader>
        <ModalCloseButton rounded="full" top="1rem" />

        <ModalBody>
          <Tabs
            onChange={(index) => setTabIndex(index)}
            variant="unstyled"
            isFitted
          >
            <TabList>
              <Tab {...tabStyles}>Sign Up</Tab>
              <Tab {...tabStyles}>Log In</Tab>
            </TabList>

            <TabPanels>
              <TabPanel
                pt="1.5rem"
                //
              >
                <AuthForm variant="signup" onClose={onClose} />
              </TabPanel>
              <TabPanel>
                <AuthForm variant="signin" onClose={onClose} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SignupModal;
