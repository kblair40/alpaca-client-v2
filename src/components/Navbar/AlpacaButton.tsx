import { Box, useTheme, useColorModeValue } from "@chakra-ui/react";

import { AlpacaLogoIcon, ExclamationIcon } from "utils/icons";
import useSelector from "hooks/useSelector";

const AlpacaButton = () => {
  const {
    colors: { red },
  } = useTheme();
  const exclamationFill = useColorModeValue(red["600"], red["500"]);

  const { authenticated } = useSelector((st) => st.user);

  return (
    <Box position="relative">
      <Box zIndex={1}>
        <AlpacaLogoIcon boxSize="32px" />
      </Box>

      {authenticated && !authenticated.alpaca ? (
        <Box position="absolute" top="-6px" left="-2px" zIndex={2}>
          <ExclamationIcon boxSize="12px" fill={exclamationFill} />
        </Box>
      ) : null}
    </Box>
  );
};

export default AlpacaButton;
