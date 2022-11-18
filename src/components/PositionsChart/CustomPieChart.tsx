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
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";

import {
  darkModeChartColors as darkColors,
  lightModeChartColors as lightColors,
} from "utils/constants";

import { type ChartData } from "./PositionsChart";

type Props = {
  data: ChartData[];
  label?: string;
};

const CustomPieChart = ({ data, label }: Props) => {
  const COLORS = useColorModeValue(lightColors, darkColors);
  // const renderLegend = (legendProps: { payload: any }) => {
  const renderLegend = (props: any) => {
    console.log("\n\nLEGEND PROPS:", props.payload, "\n\n");
    if (!props) return null;
    // const {}

    //
    return (
      <Flex justify={{ base: "center", md: "unset" }}>
        <Stack
          spacing={{ base: "4px" }}
          // align="center"
          w="max-content"
          // direction={{ base: "column" }}
          // border="1px solid #888"
          //
        >
          {props.payload.map((dataPoint: ChartData, index: number) => {
            if (!dataPoint.value) return null;
            return (
              <Stack
                key={index}
                fontSize={{ base: "sm", lg: "md" }}
                align="center"
                direction={{ base: "row" }}
                spacing="4px"
              >
                <Box boxSize="12px" bg={dataPoint.color} rounded="full" />
                <Text
                  //
                  // border="1px solid white"
                  w={{ base: "46px", lg: "56px" }}
                  fontWeight="500"
                >
                  {dataPoint.name}
                </Text>
                <Text pl="6px" fontWeight="700">
                  {dataPoint.legendValue}
                </Text>
              </Stack>
            );
          })}
        </Stack>
      </Flex>
    );
  };

  const radius = useBreakpointValue({
    base: { innerRadius: "36", outerRadius: "48" },
    sm: { innerRadius: "40.5", outerRadius: "54" },
    md: { innerRadius: "51", outerRadius: "68" },
    lg: { innerRadius: "54", outerRadius: "72" },
  });

  const cx = useBreakpointValue({
    // base: 42,
    base: "50%",
    // sm: 54,
    md: 66,
    // lg: 100,
    lg: 70,
  });

  const legendLayout = useBreakpointValue({
    base: { layout: "horizontal", verticalAlign: "bottom", align: "center" },
    md: { layout: "vertical", verticalAlign: "middle", align: "right" },
  });

  console.log("\n\nLEGEND LAYOUT:", legendLayout, "\n\n");

  const legendProps = {
    content: renderLegend,
    payload: data,
    ...legendLayout,
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart
      // onMouseEnter={onPieEnter}
      >
        <Pie
          data={data}
          cx={cx}
          {...radius}
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
        {/* @ts-ignore */}
        <Legend
          {...legendProps}
          // content={renderLegend}
          // payload={data}
          // {{}}
          // {{}}
          // {legendLayout ? ...legendLayout : null}

          // {...legendLayout}
          // layout="vertical"
          // verticalAlign="middle"
          // align="right"
        />
        {/* <Legend content={renderLegend} /> */}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
