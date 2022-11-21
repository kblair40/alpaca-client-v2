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
                        <Link to={`/order/${order.id}`}>
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
              <NoOrders />
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
    <Flex mt="2rem" py="1rem" direction="column" align="center">
      <Text textAlign="center" fontWeight="600">
        No Orders Match Your Search Criteria
      </Text>
      <Text textAlign="center">Try adjusting filter values</Text>
    </Flex>
  );
};

// {
//   /* <Box position="relative" top="60px">
//         <HStack
//           position="absolute"
//           top={{ base: "-32px", md: "-34px" }}
//           left={0}
//           right={0}
//           align="center"
//           fontSize="13px"
//           fontWeight="700"
//           w="100%"
//           textAlign="center"
//           textDecoration="underline"
//         >
//           <Text flex={0.75} textAlign="left">
//             Symbol
//           </Text>
//           <Text flex={1}>Side</Text>
//           <Text flex={1}>Type</Text>

//           <Text flex={1}>Created</Text>
//           <Text flex={1}>Status</Text>
//           <Text flex={1} display={{ base: "none", md: "inline" }}>
//             Ordered Qty
//           </Text>
//           <Text flex={1.25} display={{ base: "none", md: "inline" }}>
//             Avg Filled Price
//           </Text>
//           <Text flex={1}>Details</Text>
//         </HStack>

//         <VStack
//           spacing="4px"
//           divider={<StackDivider />}
//           overflowY="auto"
//           pb="1rem"
//         >
//           {status === "loading" ? (
//             <Center h="100px">
//               <Spinner />
//             </Center>
//           ) : status === "completed" && orders && orders.length ? (
//             orders.map((order: IOrder, i) => {
//               const orderId = order.id;
//               const side = order.side;
//               const symbol = order.symbol;
//               const orderType = order.type;
//               const status = order.status;
//               const filledAvgPrice = order.filled_avg_price;
//               const qty = order.qty;
//               const date = dayjs(order.created_at);
//               const createdAt = date.format("M/D/YY");
//               const dateTip = date.format("MMM D, YYYY h:mm a");

//               return (
//                 <HStack
//                   fontSize="13px"
//                   key={i}
//                   w="100%"
//                   textAlign="center"
//                   py="4px"
//                 >
//                   <Text flex={0.75} textAlign="left">
//                     {symbol}
//                   </Text>
//                   <Text flex={1} textTransform="capitalize">
//                     {side}
//                   </Text>
//                   <Text flex={1} textTransform="capitalize">
//                     {orderTypes[orderType]}
//                   </Text>
//                   <Tooltip label={dateTip}>
//                     <Text flex={1}>{createdAt}</Text>
//                   </Tooltip>
//                   <Text flex={1} textTransform="capitalize">
//                     {status}
//                   </Text>
//                   <Text display={{ base: "none", md: "inline" }} flex={1}>
//                     {qty}
//                   </Text>
//                   <Text display={{ base: "none", md: "inline" }} flex={1.25}>
//                     {filledAvgPrice ? `$${filledAvgPrice}` : "-"}
//                   </Text>

//                   <Flex justify="center" flex={1}>
//                     <Link to={`/order/${orderId}`}>
//                       <IconButton
//                         aria-label="See Details"
//                         size="xs"
//                         icon={
//                           <ChevronDownIcon
//                             boxSize="16px"
//                             transform="rotate(-90deg)"
//                           />
//                         }
//                       />
//                     </Link>
//                   </Flex>
//                 </HStack>
//               );
//             })
//           ) : status === "completed" && orders && !orders.length ? (
//             <NoOrders />
//           ) : null}
//         </VStack>
//       </Box> */
// }
