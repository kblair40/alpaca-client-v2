import {
  Box,
  Text,
  Flex,
  Center,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

import { type Performance } from "./ChartHeader";

type Props = {
  performance: Performance;
};

const PerformanceChip = ({ performance }: Props) => {
  let posBg = useColorModeValue("green.700", "green.100");
  let negBg = useColorModeValue("red.700", "red.200");
  let posText = useColorModeValue("green.100", "green.700");
  let negText = useColorModeValue("red.200", "red.700");

  if (performance && performance.numeric && performance.percent) {
    let isGain = parseFloat(performance.numeric) > 0;

    const textProps = {
      fontSize: "sm",
      fontWeight: "600",
      color: isGain ? posText : negText,
    };

    const numeric = parseFloat(performance.numeric).toFixed(2);
    const percent = parseFloat(performance.percent).toFixed(2);

    return (
      <Center
        w="max-content"
        lineHeight={1}
        p="6px"
        rounded="full"
        bg={isGain ? posBg : negBg}
      >
        <Flex>
          <Text mr="4px" {...textProps}>
            {isGain ? `+${numeric}` : numeric}
          </Text>
          <Text {...textProps}>({percent}%)</Text>
        </Flex>
      </Center>
    );
  }
  return null;
};

export default PerformanceChip;
