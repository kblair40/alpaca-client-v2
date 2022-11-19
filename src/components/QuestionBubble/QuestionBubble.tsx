import { Tooltip } from "@chakra-ui/react";

import { QuestionIcon } from "utils/icons";

type Props = {
  tooltipLabel: string;
  iconBoxSize?: string;
};

const QuestionBubble = ({ tooltipLabel, iconBoxSize = "18px" }: Props) => {
  return (
    <Tooltip label={tooltipLabel}>
      <QuestionIcon boxSize={iconBoxSize} />
    </Tooltip>
  );
};

export default QuestionBubble;
