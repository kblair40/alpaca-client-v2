import { useEffect, Fragment } from "react";
import {
  Text,
  Flex,
  Center,
  Spinner,
  Stat,
  StatLabel,
  StatNumber,
  Grid,
  GridItem,
} from "@chakra-ui/react";

import useDispatch from "hooks/useDispatch";
import useSelector from "hooks/useSelector";
import { fetchAccount } from "store/accountSlice";

const AlpacaAccount = () => {
  const dispatch = useDispatch();
  const { status, data } = useSelector((st) => st.account);

  useEffect(() => {
    dispatch(fetchAccount());
  }, [dispatch]);
  // console.log("ACCOUNT DATA:", data);

  return (
    <Flex mt={{ base: "1rem" }} direction="column" align="center">
      <Text fontSize="xl" fontWeight="600">
        Account
      </Text>

      {status === "loading" ? (
        <Center>
          <Spinner />
        </Center>
      ) : status === "completed" && !!data ? (
        <Fragment>
          <Grid
            w="100%"
            pt="1rem"
            maxW={{ base: "500px", md: "unset" }}
            gridTemplateRows={{ base: "72px 72px", md: "72px" }}
            justifyItems={{ base: "center" }}
            gridTemplateColumns={{ base: "50% 50%", md: "25% 25% 25% 25%" }}
          >
            <CustomStat label="Total Equity" value={data.equity} />
            <CustomStat label="Buying Power" value={data.buying_power} />
            <CustomStat label="Cash For Trading" value={data.cash} />

            <CustomStat
              label="Total Position Value"
              value={data.position_market_value}
            />
          </Grid>
          {/* <Text variant="secondary" fontSize="sm">
            {`Data as of ${data.balance_asof}`}
          </Text> */}
        </Fragment>
      ) : null}
    </Flex>
  );
};

export default AlpacaAccount;

type StatProps = {
  label: string;
  value: string;
};

const CustomStat = ({ label, value }: StatProps) => {
  let options = {
    currency: "USD",
    currencyDisplay: "narrowSymbol",
    currencySign: "accounting",
    style: "currency",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  const convertToCurrency = (num: string) => {
    return parseFloat(num).toLocaleString("en-US", options);
  };

  return (
    <GridItem w={{ base: "160px", sm: "200px" }}>
      <Stat display="flex" flexDirection="column" alignItems="center">
        <StatLabel textAlign={"center"}>{label}</StatLabel>
        <StatNumber>{convertToCurrency(value)}</StatNumber>
      </Stat>
    </GridItem>
  );
};
