import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useColorMode, useTheme } from "@chakra-ui/react";

type Props = {
  data: any;
};

const LineChart = ({ data }: Props) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const { colors } = useTheme();

  const lineColor = isDark ? colors.gray["300"] : colors.gray["700"];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ReLineChart
        // width={500}
        // height={300}
        data={data}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="t" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="o"
          stroke={lineColor}
          activeDot={{ r: 8 }}
        />
      </ReLineChart>
    </ResponsiveContainer>
  );
};

export default LineChart;
