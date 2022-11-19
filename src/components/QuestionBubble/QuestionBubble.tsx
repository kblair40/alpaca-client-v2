import { Tooltip, Box } from "@chakra-ui/react";

import { QuestionIcon } from "utils/icons";

type Props = {
  label: string;
  iconBoxSize?: string;
};

const QuestionBubble = ({ label, iconBoxSize = "18px" }: Props) => {
  return (
    <Tooltip label={label}>
      <Box>
        <QuestionIcon boxSize={iconBoxSize} />
      </Box>
    </Tooltip>
  );
};

export default QuestionBubble;
