import { useState, useEffect } from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";

import useSelector from "hooks/useSelector";
import ChartHeader from "./ChartHeader";
import LineChart from "./LineChart";

const Chart = () => {
  const [formattedData, setFormattedData] = useState<any>();
  const bg = useColorModeValue("gray.100", "gray.800");

  const { data, ticker, status } = useSelector((st) => st.chart);

  useEffect(() => {
    if (!data || !data.bars || !data.bars.bars) return;

    const { bars } = data;
    console.log("\nBARS:", bars.bars);
    setFormattedData(bars.bars);
  }, [data]);

  return (
    <Box bg={bg} p="1rem" borderRadius="12px">
      <ChartHeader />

      <Box
        mt="2rem"
        // border="1px solid #aaa"
        w="100%"
        h={"300px"}
        //
      >
        {formattedData && <LineChart data={formattedData} />}
      </Box>
    </Box>
  );
};

export default Chart;
