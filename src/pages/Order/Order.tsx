import { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  Center,
  Spinner,
  Stack,
  StackDivider,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

// import useDispatch from "hooks/useDispatch";
import { ArrowLeftIcon, EditIcon } from "utils/icons";
import { toTitleCase } from "utils/helpers";
import { type IOrder } from "utils/types/order";
import { alpaca } from "api";
import EditOrderModal from "components/Modals/EditOrderModal";
import CancelOrderModal from "components/Modals/CancelOrderModal";

const ASSET_CLASSES: { [key: string]: string } = {
  us_equity: "US Equity",
};

const Order = () => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [orderData, setOrderData] = useState<IOrder | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const { orderId } = useParams();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await alpaca.get(`/order/${orderId}`);
        console.log("\n\nORDER RESPONSE:", response.data, "\n\n");
        setOrderData(response.data);
      } catch (e) {
        console.log("FAILED TO FETCH ORDER:", e);
        setOrderData(null);
      }
      setLoading(false);
    };

    fetchOrder();
  }, [orderId]);

  const editableStatuses = [
    "new",
    "done_for_day",
    "accepted_for_bidding",
    "accepted",
  ];
  const filledStatuses = ["filled", "partially_filled"];

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };

  const handleReplaceOrder = () => {
    handleCloseEditModal();
    navigate("/dashboard");
  };
  const handleDeleteOrder = () => {
    setCancelModalOpen(false);
    navigate("/dashboard");
  };

  if (loading) {
    return (
      <Center h="100px">
        <Spinner />
      </Center>
    );
  }

  if (orderData) {
    const clientOrderId = orderData.client_order_id;
    const side = orderData.side;
    const symbol = orderData.symbol;
    const assetId = orderData.asset_id;
    const assetClass = orderData.asset_class;
    const timeInForce = orderData.time_in_force;
    const orderType = orderData.type || "";
    const limitPrice = ["limit", "stop_limit"].includes(orderData.type)
      ? orderData.limit_price || "-"
      : "-";
    const stopPrice = ["limstopit", "stop_limit"].includes(orderData.type)
      ? orderData.stop_price || "-"
      : "-";
    const status = orderData.status;
    const filledAvgPrice = orderData.filled_avg_price || "-";
    const qty = orderData.qty || "0";
    const filledQty = orderData.filled_qty;
    const createdAt = orderData.created_at;
    const updatedAt = orderData.updated_at;
    const submittedAt = orderData.submitted_at;
    const filledAt = orderData.filled_at;
    const expiredAt = orderData.expired_at;
    const canceledAt = orderData.canceled_at;
    const failedAt = orderData.failed_at;
    const replacedAt = orderData.replaced_at;
    const replacedBy = orderData.replaced_by;
    const replaces = orderData.replaces;
    const isEditable = editableStatuses.includes(orderData.status);
    const isFilled =
      filledStatuses.includes(orderData.status) && !!filledAvgPrice;

    // console.log("status:", status);

    return (
      <Fragment>
        {orderData && (
          <EditOrderModal
            orderData={orderData}
            isOpen={editModalOpen}
            onClose={handleCloseEditModal}
            onReplaceOrder={handleReplaceOrder}
          />
        )}

        {cancelModalOpen && orderData ? (
          <CancelOrderModal
            isOpen={cancelModalOpen}
            onClose={() => setCancelModalOpen(false)}
            orderId={orderData.id}
            onDeleteOrder={handleDeleteOrder}
          />
        ) : null}

        <Box position="fixed" top="76px" left="1rem">
          <BackToDashboard />
        </Box>

        <Flex
          direction="column"
          align="center"
          pt={{ base: "5rem", sm: "4rem", md: "3rem" }}
          px={{ base: "1rem", sm: "3rem" }}
        >
          <Flex align="end" lineHeight={1}>
            <Text
              mr="1rem"
              fontSize={{ base: "lg", sm: "xl" }}
              fontWeight={600}
            >
              {symbol}
            </Text>

            {!isFilled ? (
              <Text
                textTransform="capitalize"
                fontSize={{ base: "sm", sm: "md" }}
              >{`${toTitleCase(orderType, "_")} ${side}`}</Text>
            ) : (
              <Text
                textTransform="capitalize"
                fontSize={{ base: "sm", sm: "md" }}
              >{`${side} ${qty} @ ${filledAvgPrice}`}</Text>
            )}

            {isEditable && (
              <Fragment>
                <Button
                  ml="2rem"
                  variant="solid-blue"
                  size="xs"
                  leftIcon={<EditIcon boxSize="16px" />}
                  onClick={() => setEditModalOpen(true)}
                  isDisabled={!orderData}
                >
                  Edit Order
                </Button>
                <Button
                  ml="1rem"
                  variant="solid-red"
                  size="xs"
                  leftIcon={<EditIcon boxSize="16px" />}
                  onClick={() => setCancelModalOpen(true)}
                  isDisabled={!orderData}
                >
                  Cancel Order
                </Button>
              </Fragment>
            )}
          </Flex>

          <Box mt="1.5rem">
            <Stack divider={<StackDivider />}>
              <Stack spacing="2px">
                <DataField label="Order ID" value={orderId || "-"} />
                <DataField label="Client Order ID" value={clientOrderId} />
              </Stack>

              <Stack spacing="2px">
                <DataField
                  label="Time in Force"
                  value={timeInForce.toUpperCase()}
                />
                <DataField label="Status" value={toTitleCase(status)} />
                <DataField label="Qty Ordered" value={qty} />
                <DataField label="Qty Filled" value={filledQty} />
                <DataField
                  label="Avg Fill Price"
                  value={filledAvgPrice || "n/a"}
                  isCost={filledAvgPrice !== "-"}
                />
                <DataField
                  label="Total Cost"
                  value={
                    filledQty !== "0"
                      ? parseFloat(filledQty) * parseFloat(filledAvgPrice)
                      : "-"
                  }
                  isCost={filledQty !== "0"}
                />
              </Stack>

              <Stack spacing="2px">
                <DataField
                  label="Limit Price"
                  value={limitPrice}
                  isCost={limitPrice !== "-"}
                />
                <DataField
                  label="Stop Price"
                  value={stopPrice}
                  isCost={stopPrice !== "-"}
                />
              </Stack>

              <Stack spacing="2px">
                <DataField label="Asset ID" value={assetId || "-"} />
                <DataField
                  label="Asset Class"
                  value={ASSET_CLASSES[assetClass]}
                />
              </Stack>

              <Stack spacing="2px">
                <DataField
                  label="Submitted Date"
                  value={
                    submittedAt ? new Date(submittedAt).toLocaleString() : "-"
                  }
                />
                <DataField
                  label="Created Date"
                  value={createdAt ? new Date(createdAt).toLocaleString() : "-"}
                />
                <DataField
                  label="Filled Date"
                  value={filledAt ? new Date(filledAt).toLocaleString() : "-"}
                />
                <DataField
                  label="Updated Date"
                  value={updatedAt ? new Date(updatedAt).toLocaleString() : "-"}
                />
                <DataField
                  label="Expired Date"
                  value={expiredAt ? new Date(expiredAt).toLocaleString() : "-"}
                />
                <DataField
                  label="Cancelled Date"
                  value={
                    canceledAt ? new Date(canceledAt).toLocaleString() : "-"
                  }
                />
                <DataField
                  label="Failed Date"
                  value={failedAt ? new Date(failedAt).toLocaleString() : "-"}
                />
                <DataField
                  label="Replaced Date"
                  value={
                    replacedAt ? new Date(replacedAt).toLocaleString() : "-"
                  }
                />
              </Stack>

              <Stack spacing="2px">
                <DataField
                  label="Replaced By"
                  value={replacedBy ? replacedBy : "-"}
                />
                <DataField label="Replaces" value={replaces ? replaces : "-"} />
              </Stack>
            </Stack>
          </Box>
        </Flex>
      </Fragment>
    );
  }

  return null;
};

export default Order;

const DataField = ({
  label,
  value,
  isCost = false,
}: {
  label: string;
  value: string | number;
  isCost?: boolean;
}) => {
  return (
    <Flex justify="space-between">
      <Text
        fontSize={{ base: "xs", sm: "sm" }}
        w={{ base: "90px", sm: "140px" }}
        mr="1rem"
        whiteSpace="nowrap"
      >
        {label}
      </Text>
      <Text fontSize={{ base: "xs", sm: "sm" }} flex={1} whiteSpace="nowrap">
        {`${isCost ? "$" : ""}${value}`}
      </Text>
    </Flex>
  );
};

const BackToDashboard = () => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const lightStyles = {
    bg: "white",
    _hover: { bg: "gray.50" },
    _active: { bg: "gray.100" },
  };
  const darkStyles = {
    bg: "gray.900",
    _hover: { bg: "gray.800" },
    _active: { bg: "gray.700" },
  };

  const btnStyles = isDark ? darkStyles : lightStyles;

  return (
    <Link to="/dashboard">
      <Button
        {...btnStyles}
        leftIcon={<ArrowLeftIcon boxSize="18px" />}
        size="sm"
      >
        Back to Dashboard
      </Button>
    </Link>
  );
};
