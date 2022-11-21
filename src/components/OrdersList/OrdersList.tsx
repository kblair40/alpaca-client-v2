import {
  Box,
  Flex,
  Text,
  Center,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useBreakpointValue,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

import { VisibleIcon } from "utils/icons";
import { convertToCurrency } from "utils/helpers";
import useSelector from "hooks/useSelector";
import OrderFilters from "./OrderFilters";

const orderTypes: { [key: string]: string } = {
  market: "Market",
  limit: "Limit",
  stop: "Stop",
  stop_limit: "Stop Limit",
};

type Label = {
  [key: string]: string | boolean;
  isNumeric: boolean;
  label: string;
};

const COLUMN_LABELS: Label[] = [
  { label: "Symbol", isNumeric: false },
  { label: "Side", isNumeric: false },
  { label: "Type", isNumeric: false },
  { label: "Created", isNumeric: false },
  { label: "Status", isNumeric: false },
  { label: "Ordered Qty", isNumeric: false },
  { label: "Avg Filled Price", isNumeric: true },
  { label: "Details", isNumeric: false },
];

const OrdersList = () => {
  const { status, orders } = useSelector((st) => st.order);

  const shortDateFormat = "MM//DD/YY";
  const longDateFormat = "MM//DD/YYYY hh:mm:ss A";
  const dateFormat = useBreakpointValue({
    base: shortDateFormat,
    md: longDateFormat,
  });

  const bodyFontSize = useBreakpointValue({ base: "xs", sm: "sm" });

  return (
    <Flex h="100%" direction="column" minH="240px">
      <Box px="1rem">
        <OrderFilters />
      </Box>

      <TableContainer w="100%" h="100%" mt="1rem" overflowY="auto">
        <Table size="sm">
          <Thead>
            <Tr>
              {COLUMN_LABELS.map((label, i) => {
                return (
                  <Th isNumeric={label.isNumeric} key={i}>
                    {label.label}
                  </Th>
                );
              })}
            </Tr>
          </Thead>

          <Tbody>
            {status === "completed" && orders && orders.length ? (
              orders.map((order, i) => {
                return (
                  <Tr key={i}>
                    <Td fontSize={bodyFontSize}>{order.symbol}</Td>
                    <Td textTransform="capitalize" fontSize={bodyFontSize}>
                      {order.side}
                    </Td>
                    <Td fontSize={bodyFontSize}>{orderTypes[order.type]}</Td>
                    <Td fontSize={bodyFontSize}>
                      {dayjs(order.created_at).format(dateFormat)}
                    </Td>
                    <Td textTransform="capitalize" fontSize={bodyFontSize}>
                      {order.status}
                    </Td>
                    <Td fontSize={bodyFontSize} isNumeric>
                      {order.qty || "-"}
                    </Td>
                    <Td fontSize={bodyFontSize} isNumeric>
                      {order.filled_avg_price
                        ? convertToCurrency(order.filled_avg_price)
                        : "-"}
                    </Td>
                    <Td>
                      <Center>
                        <Link to={`/order/${order.id}`} state={{ tabIndex: 1 }}>
                          <IconButton
                            aria-label="See Details"
                            variant="icon-button"
                            size="xs"
                            icon={<VisibleIcon boxSize="16px" />}
                          />
                        </Link>
                      </Center>
                    </Td>
                  </Tr>
                );
              })
            ) : status === "completed" && orders && !orders.length ? (
              <Tr>
                <NoOrders />
              </Tr>
            ) : null}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default OrdersList;

const NoOrders = () => {
  return (
    <Flex
      mt="2rem"
      py="1rem"
      direction="column"
      align="center"
      position="absolute"
      left="50%"
      transform="translateX(-50%)"
    >
      <Text textAlign="center" fontWeight="600">
        No Orders Match Your Search Criteria
      </Text>
      <Text textAlign="center">Try adjusting filter values</Text>
    </Flex>
  );
};
