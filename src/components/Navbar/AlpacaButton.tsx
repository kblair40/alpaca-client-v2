import React, { useState } from "react";
import { Box, useTheme, useColorModeValue } from "@chakra-ui/react";

import { AlpacaLogoIcon, ExclamationIcon } from "utils/icons";
import useSelector from "hooks/useSelector";
import AlpacaAuthModal from "components/Modals/AlpacaAuthModal";

const AlpacaButton = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const {
    colors: { red },
  } = useTheme();
  const exclamationFill = useColorModeValue(red["600"], red["500"]);

  const { authenticated } = useSelector((st) => st.user);

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

        {authenticated && !authenticated.alpaca ? (
          <Box position="absolute" top="-6px" left="-2px" zIndex={2}>
            <ExclamationIcon boxSize="12px" fill={exclamationFill} />
          </Box>
        ) : null}
      </Box>

      {modalOpen && (
        <AlpacaAuthModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </React.Fragment>
  );
};

export default AlpacaButton;
