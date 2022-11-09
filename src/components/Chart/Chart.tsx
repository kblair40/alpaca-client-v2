import { Box, useColorModeValue } from "@chakra-ui/react";

const Chart = () => {
  const bg = useColorModeValue("gray.100", "gray.700");

  return (
    <Box bg={bg} p="1rem" borderRadius="12px">
      Chart
    </Box>
  );
};

export default Chart;
