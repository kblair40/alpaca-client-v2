import { Box, useColorModeValue } from "@chakra-ui/react";

import useSelector from "hooks/useSelector";
import ChartHeader from "./ChartHeader";

const Chart = () => {
  const bg = useColorModeValue("gray.100", "gray.800");

  const { data, status } = useSelector((st) => st.chart);

  return (
    <Box bg={bg} p="1rem" borderRadius="12px">
      <ChartHeader />
    </Box>
  );
};

export default Chart;
