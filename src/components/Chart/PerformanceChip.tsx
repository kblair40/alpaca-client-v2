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
  status?: "loading" | "completed" | "failed" | null;
};
// 100 x 26 (px)
const PerformanceChip = ({ performance, status }: Props) => {
  let posBg = useColorModeValue("green.700", "green.100");
  let negBg = useColorModeValue("red.700", "red.200");
  let neutralBg = useColorModeValue("gray.200", "gray.700");

  let posText = useColorModeValue("green.100", "green.700");
  let negText = useColorModeValue("red.200", "red.700");

  if (status === "loading") {
    return (
      <Center rounded="full" h="26px" w="60px" bg={neutralBg}>
        <Spinner size="sm" />
      </Center>
    );
  }

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
