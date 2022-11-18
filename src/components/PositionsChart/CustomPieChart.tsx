import { Fragment } from "react";
import {
  PieChart,
  Pie,
  // Sector,
  Cell,
  ResponsiveContainer,
  Legend,
  Text as ReText,
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

  const renderLegend = (props: any) => {
    // console.log("\n\nLEGEND PROPS:", props.payload, "\n\n");
    if (!props) return null;
    return (
      <Flex
        justify={{ base: "center", md: "unset" }}
        position="absolute"
        left={{ base: "50%", md: "-50%" }}
        transform={{
          base: "translateX(-50%)",
          md: "translateX(-148px)",
          lg: "translateX(-178px)",
        }}
        top={{ base: "108px", sm: "120px", md: "0" }}
      >
        <Stack spacing={{ base: "4px" }} w="max-content">
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
                <Text w={{ base: "46px", lg: "56px" }} fontWeight="500">
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
    base: "50%",
    md: 66,
    lg: 70,
  });

  const cy = useBreakpointValue({
    base: 46,
    sm: 54,
    md: 66,
    lg: 72,
  });

  const legendLayout = useBreakpointValue({
    base: { layout: "horizontal", verticalAlign: "top", align: "center" },
    md: { layout: "vertical", verticalAlign: "top", align: "right" },
  });

  const chartHeight = useBreakpointValue({
    base: 200,
    md: 300,
  });

  console.log("\n\nLEGEND LAYOUT:", legendLayout, "\n\n");

  const legendProps = {
    content: renderLegend,
    payload: data,
    ...legendLayout,
  };

  return (
    <Fragment>
      <Text
        textAlign="center"
        mb="1rem"
        fontSize={{ base: "xl" }}
        fontWeight="700"
      >
        {label}
      </Text>
      <ResponsiveContainer width="100%" height="100%" debounce={200}>
        <PieChart>
          <Pie
            data={data}
            cx={cx}
            cy={cy}
            height={chartHeight}
            {...radius}
            paddingAngle={0}
            dataKey="value"
          >
            <ReText>Hello</ReText>
            {data.map((entry, index) => {
              // console.log("\n\nENTRY:", entry, "\n\n");
              return (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              );
            })}
          </Pie>
          {/* @ts-ignore */}
          <Legend {...legendProps} />
        </PieChart>
      </ResponsiveContainer>
    </Fragment>
  );
};

export default CustomPieChart;
