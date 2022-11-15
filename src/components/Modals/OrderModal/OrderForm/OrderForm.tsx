import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Stack,
  Button,
  useColorModeValue,
  FormHelperText,
  FormErrorMessage,
  Box,
} from "@chakra-ui/react";

type Props = {};

const DEFAULT_VALUES = {
  orderType: "market",
  // quantity: "0",
  quantity: 0,
  timeInForce: "day",
};

const OrderForm = (props: Props) => {
  const [formData, setFormData] = useState(DEFAULT_VALUES);

  return (
    <Stack>
      <FormControl isRequired>
        <FormLabel>Watchlist Name</FormLabel>
        <Input
          variant="neutral-outline"
          // value={name}
          // isInvalid={nameInvalid}
          // onChange={(e) => {
          //   setName(e.target.value);
          //   if (createError) setCreateError("");
          // }}
        />
      </FormControl>
    </Stack>
  );
};

export default OrderForm;
