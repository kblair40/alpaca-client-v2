import React from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { useBreakpointValue } from "@chakra-ui/react";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

type Props = {};

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const CustomPieChart = (props: Props) => {
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
      // width={500}
      // height={250}
      // onMouseEnter={onPieEnter}
      >
        <Pie
          data={data}
          // cx="50%"
          // cx="20%"
          // cy="50%"
          cx={cx}
          // cx={90}
          // cy={150}
          {...radiuses}
          fill="#8884d8"
          paddingAngle={4}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
