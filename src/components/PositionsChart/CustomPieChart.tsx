// import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  useBreakpointValue,
  Box,
  Text,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

import {
  darkModeChartColors as darkColors,
  lightModeChartColors as lightColors,
} from "utils/constants";

import { type ChartData } from "./PositionsChart";

type Props = {
  data: ChartData[];
};

const CustomPieChart = ({ data }: Props) => {
  const COLORS = useColorModeValue(lightColors, darkColors);
  // const renderLegend = (legendProps: { payload: any }) => {
  const renderLegend = (props: any) => {
    console.log("\n\nLEGEND PROPS:", props.payload, "\n\n");
    if (!props) return null;
    // const {}

    //
    return (
      <Stack direction={{ base: "column" }} spacing={{ base: "4px" }}>
        {props.payload.map((dataPoint: ChartData, index: number) => {
          if (!dataPoint.value) return null;
          return (
            <Stack direction={{ base: "row" }} spacing="4px">
              <Text fontWeight="500">{dataPoint.name}</Text>
              <Text fontWeight="600">{dataPoint.legendValue}</Text>
            </Stack>
          );
        })}
      </Stack>
    );
  };

  // const renderLegend = (props: any) => {
  //   console.log("\n\nLEGEND PROPS:", props.payload, "\n\n");
  //   if (!props) return null;
  //   // const {}

  //   //
  //   return (
  //     <Stack direction={{ base: "column" }} spacing={{ base: "4px" }}></Stack>
  //   );
  // };

  const radiuses = useBreakpointValue({
    base: { innerRadius: "36", outerRadius: "48" },
    sm: { innerRadius: "45", outerRadius: "60" },
    md: { innerRadius: "60", outerRadius: "80" },
    lg: { innerRadius: "75", outerRadius: "100" },
  });

  const cx = useBreakpointValue({
    base: 48,
    sm: 60,
    md: 80,
    lg: 100,
  });
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart
      // onMouseEnter={onPieEnter}
      >
        <Pie
          data={data}
          cx={cx}
          {...radiuses}
          fill="#8884d8"
          paddingAngle={4}
          dataKey="value"
        >
          {data.map((entry, index) => {
            console.log("\n\nENTRY:", entry, "\n\n");
            return (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            );
          })}
        </Pie>
        <Legend content={renderLegend} payload={data} />
        {/* <Legend content={renderLegend} /> */}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
