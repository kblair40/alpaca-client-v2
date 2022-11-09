import { useColorModeValue, Box, Text, Flex } from "@chakra-ui/react";

type TooltipProps = {
  active?: boolean;
  payload?: any;
  label?: string;
};

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  const bg = useColorModeValue("gray.50", "gray.700");
  if (active && payload && payload.length) {
    return (
      <Box className="custom-tooltip" bg={bg} p=".75rem" rounded="lg">
        <Text fontWeight="500" className="label">{`${new Date(
          label ? label : ""
        )
          .toLocaleString("en-US", {
            month: "2-digit",
            year: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })
          .split(", ")
          .join(" at ")}`}</Text>

        <Flex mt=".25rem">
          <Text fontWeight="600">Price:&nbsp; </Text>
          <Text fontWeight="600">${payload[0].value?.toFixed(3)}</Text>
        </Flex>
      </Box>
    );
  }

  return null;
};

export default CustomTooltip;
