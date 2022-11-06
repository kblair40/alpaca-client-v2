import { Box, useTheme, useColorModeValue } from "@chakra-ui/react";

import { AlpacaLogoIcon, ExclamationIcon } from "utils/icons";

const AlpacaButton = () => {
  const {
    colors: { red },
  } = useTheme();
  const exclamationFill = useColorModeValue(red["600"], red["500"]);

  return (
    <Box position="relative">
      <Box zIndex={1}>
        <AlpacaLogoIcon boxSize="32px" />
      </Box>

      <Box position="absolute" top="-6px" left="-2px" zIndex={2}>
        <ExclamationIcon boxSize="12px" fill={exclamationFill} />
      </Box>
    </Box>
  );
};

export default AlpacaButton;
