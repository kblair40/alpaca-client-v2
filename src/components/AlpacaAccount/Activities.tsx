import { useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Center,
  Spinner,
  Stack,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

import { VisibleIcon } from "utils/icons";
import { fetchAccountActivities } from "store/accountSlice";
import useDispatch from "hooks/useDispatch";
import useSelector from "hooks/useSelector";
import { convertToCurrency } from "utils/helpers";

const Activities = () => {
  const dispatch = useDispatch();
  const { activitiesStatus, activities } = useSelector((st) => st.account);

  const dateFormat = "MM/DD/YYYY, hh:mm:ss A";

  useEffect(() => {
    dispatch(fetchAccountActivities());
  }, [dispatch]);

  const header = () => (
    <Box w="100%">
      <Text fontSize="xl" fontWeight="600" lineHeight={1} textAlign="center">
        Account Activities
      </Text>
    </Box>
  );

  const calculateActivityCost = (qty: string, price: string) => {
    let intQty = parseFloat(qty);
    let intPrice = parseFloat(price);

    return convertToCurrency(intQty * intPrice);
  };

  if (activitiesStatus === "loading") {
    return (
      <Center mt="2rem" h="100px">
        {header()}
        <Spinner />
      </Center>
    );
  }

  return (
    <Stack align="start" w="100%" pt="1.5rem" h="100%" px="1rem">
      {header()}
      <TableContainer w="100%" h="100%">
        <Table w="100%" h="100%" p={0} size="sm">
          <Thead h="41px" w="100%">
            <Tr w="100%">
              <Th>Activity</Th>
              <Th>Date</Th>
              <Th isNumeric>Amount</Th>
              <Th>Detail</Th>
            </Tr>
          </Thead>

          <Tbody p={0} w="100vw" h="calc(100% - 195px)" maxH="100%">
            {activitiesStatus === "completed" && !!activities
              ? activities
                  .concat(activities)
                  .map((activity: any, i: number) => {
                    return (
                      <Tr key={i} w="100%" textAlign="left">
                        <Td textAlign="left" textTransform="capitalize">
                          {`${activity.side} ${activity.qty} ${activity.symbol}`}
                        </Td>
                        <Td>{dayjs(activity.timestamp).format(dateFormat)}</Td>
                        <Td isNumeric>
                          <Text>
                            {calculateActivityCost(
                              activity.qty,
                              activity.price
                            )}
                          </Text>
                        </Td>
                        <Td>
                          {activity.order_id ? (
                            <Center>
                              <Link to={`/order/${activity.order_id}`}>
                                <IconButton
                                  size="xs"
                                  variant="icon-button"
                                  aria-label="Link to details page"
                                  icon={<VisibleIcon boxSize="16px" />}
                                />
                              </Link>
                            </Center>
                          ) : null}
                        </Td>
                      </Tr>
                    );
                  })
              : null}
          </Tbody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default Activities;
