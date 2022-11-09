import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  useColorMode,
  useTheme,
  useColorModeValue,
  Box,
  Text,
  Flex,
} from "@chakra-ui/react";

import CustomTooltip from "./CustomTooltip";
import useSelector from "hooks/useSelector";
import { getMin, getMax } from "./utils/getMinMax";

type Props = {
  data: any;
};

const LineChart = ({ data }: Props) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const { colors } = useTheme();

  const lineColor = isDark ? colors.gray["200"] : colors.gray["700"];
  const tickLabelColor = isDark ? colors.gray["100"] : colors.gray["700"];

  const { timeframe } = useSelector((st) => st.chart);

  const renderCustomAxisTick = ({
    x,
    y,
    payload,
  }: {
    x: number;
    y: number;
    payload: any;
  }) => {
    console.log("TICK DATA:", { x, y, payload });
    let options: any = { hour12: true };
    const date = new Date(payload.value);

    switch (timeframe) {
      case "1D":
        options = {
          ...options,
          hour: "2-digit",
          minute: "2-digit",
        };
        break;
      case "1W":
        options = { ...options, weekday: "long" };
        break;
      case "1M":
      case "6M":
      case "1Y":
        options = { ...options, month: "short", day: "2-digit" };
    }

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          // textAnchor="end"
          textAnchor="middle"
          fill={tickLabelColor}
          style={{ fontSize: "13px" }}
          // transform="rotate(-35)"
        >
          {date.toLocaleString("en-US", options || {})}
        </text>
      </g>
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ReLineChart
        data={data}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="t"
          tick={renderCustomAxisTick}
          interval="preserveStartEnd"
          // interval={3}
        />
        <YAxis
          type="number"
          domain={[
            (dataMin: number) => getMin(dataMin),
            (dataMax: number) => getMax(dataMax),
          ]}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="o"
          stroke={lineColor}
          activeDot={{ r: 5 }}
        />
      </ReLineChart>
    </ResponsiveContainer>
  );
};

export default LineChart;
