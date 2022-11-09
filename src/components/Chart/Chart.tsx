import { Box, useColorModeValue } from "@chakra-ui/react";

import ChartHeader from "./ChartHeader";

const Chart = () => {
  const bg = useColorModeValue("gray.100", "gray.800");

  return (
    <Box bg={bg} p="1rem" borderRadius="12px">
      <ChartHeader />
    </Box>
  );
};

export default Chart;
