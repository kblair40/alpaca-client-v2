import { useEffect } from "react";
import {
  Text,
  Flex,
  Center,
  Spinner,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  // StatArrow,
  StatGroup,
  Stack,
  Box,
} from "@chakra-ui/react";

// import { type IAccount } from "utils/types/account";
import useDispatch from "hooks/useDispatch";
import useSelector from "hooks/useSelector";
import { fetchAccount } from "store/accountSlice";

const AlpacaAccount = () => {
  const dispatch = useDispatch();
  const { status, data } = useSelector((st) => st.account);

  useEffect(() => {
    dispatch(fetchAccount());
  }, [dispatch]);
  console.log("ACCOUNT DATA:", data);

  return (
    <Flex
      mt={{ base: "1rem" }}
      direction="column"
      align="center"
      px={{ base: "1rem" }}
    >
      <Text fontSize="xl" fontWeight="600">
        Account
      </Text>

      {status === "loading" ? (
        <Center>
          <Spinner />
        </Center>
      ) : status === "completed" && !!data ? (
        <Box w="100%" pt="1rem">
          <StatGroup
            // border="1px solid white"
            display="flex"
            justifyContent="space-between"
          >
            <Stat>
              <StatLabel>Total Equity</StatLabel>
              <StatNumber>
                {parseFloat(data.equity).toLocaleString()}
              </StatNumber>
              <StatHelpText>{`as of ${data.balance_asof}`}</StatHelpText>
            </Stat>

            <Stat>
              <StatLabel>Buying Power</StatLabel>
              <StatNumber>
                {parseFloat(data.buying_power).toLocaleString()}
              </StatNumber>
              <StatHelpText>{`as of ${data.balance_asof}`}</StatHelpText>
            </Stat>

            <Stat>
              <StatLabel>Buying Power</StatLabel>
              <StatNumber>
                {parseFloat(data.buying_power).toLocaleString()}
              </StatNumber>
              <StatHelpText>{`as of ${data.balance_asof}`}</StatHelpText>
            </Stat>
          </StatGroup>
        </Box>
      ) : null}
    </Flex>
  );
};

export default AlpacaAccount;
