import React, { useState } from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";

import { AlpacaLogoIcon, ExclamationIcon, CheckIcon } from "utils/icons";
import useSelector from "hooks/useSelector";
import useDispatch from "hooks/useDispatch";
import { userActions } from "store/userSlice";
import AlpacaAuthModal from "components/Modals/AlpacaAuthModal";

export type Status = "error" | "success" | "disconnected" | null;

const AlpacaButton = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const exclamationFill = useColorModeValue("red.600", "red.500");
  const checkFill = useColorModeValue("green.600", "green.500");

  const { authenticated } = useSelector((st) => st.user);
  const dispatch = useDispatch();

  const handleClose = (status: Status) => {
    if (status === "success" && !authenticated.alpaca) {
      dispatch(userActions.loginAlpaca());
    } else if (status === "disconnected") {
      localStorage.removeItem("alpaca-token");
      dispatch(userActions.logoutAlpaca());
    }

    setModalOpen(false);
  };

  return (
    <React.Fragment>
      <Box
        position="relative"
        cursor="pointer"
        onClick={() => setModalOpen(true)}
      >
        <Box zIndex={1}>
          <AlpacaLogoIcon boxSize="32px" />
        </Box>

        {authenticated ? (
          <Box position="absolute" top="-6px" left="-2px" zIndex={2}>
            {!authenticated.alpaca ? (
              <ExclamationIcon boxSize="14px" fill={exclamationFill} />
            ) : (
              <CheckIcon boxSize="14px" fill={checkFill} />
            )}
          </Box>
        ) : null}
      </Box>

      {modalOpen && (
        <AlpacaAuthModal
          isOpen={modalOpen}
          onClose={handleClose}
          isAuthenticated={authenticated.alpaca}
          // onClose={() => setModalOpen(false)}
        />
      )}
    </React.Fragment>
  );
};

export default AlpacaButton;
