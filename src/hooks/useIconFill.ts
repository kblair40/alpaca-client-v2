import { useColorModeValue, useTheme } from "@chakra-ui/react";

type Props = {
  fill?: string;
};

const useIconFill = (props: Props) => {
  const {
    colors: { gray },
  } = useTheme();

  const modeBg = useColorModeValue(gray["700"], gray["50"]);
  const activeFill = props.fill ? props.fill : modeBg;

  return activeFill;
};

export default useIconFill;
