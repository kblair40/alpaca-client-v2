import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Flex, Text, Center, Spinner, Stack } from "@chakra-ui/react";

import { toTitleCase } from "utils/helpers";
import { type IOrder } from "utils/types/order";
import { alpaca } from "api";

const ASSET_CLASSES: { [key: string]: string } = {
  us_equity: "US Equity",
};

const Order = () => {
  const [orderData, setOrderData] = useState<IOrder | null>(null);
  const [loading, setLoading] = useState(true);

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
    const limitPrice =
      orderData.type === "limit" ? orderData.limit_price || "-" : "-";
    const stopPrice =
      orderData.type === "stop" ? orderData.stop_price || "-" : "-";
    const status = orderData.status;
    const filledAvgPrice = orderData.filled_avg_price;
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

    return (
      <Flex
        direction="column"
        align="center"
        mt="2rem"
        px={{ base: "1rem", sm: "3rem" }}
      >
        <Flex align="end" lineHeight={1}>
          <Text mr="1rem" fontSize="xl" fontWeight={600}>
            {symbol}
          </Text>
          <Text textTransform="capitalize">{`${orderType} ${side}`}</Text>
        </Flex>

        <Box w="100%" mt="1.5rem">
          <DataField label="Order ID" value={orderId || "-"} />
          <DataField label="Client Order ID" value={clientOrderId} />
          <DataField label="Time in Force" value={timeInForce} />
          <DataField label="Status" value={toTitleCase(status)} />
          <DataField label="Qty Ordered" value={qty} />
          <DataField label="Qty Filled" value={filledQty} />
          <DataField
            label="Avg Fill Price"
            value={filledAvgPrice || "n/a"}
            isCost
          />
          <DataField
            label="Total Cost"
            value={parseFloat(filledQty) * parseFloat(filledAvgPrice || "-")}
            isCost
          />
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
          <DataField label="Asset ID" value={assetId || "-"} />
          <DataField label="Asset Class" value={ASSET_CLASSES[assetClass]} />
          <DataField
            label="Submitted Date"
            value={submittedAt ? new Date(submittedAt).toLocaleString() : "-"}
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
            value={canceledAt ? new Date(canceledAt).toLocaleString() : "-"}
          />
          <DataField
            label="Failed Date"
            value={failedAt ? new Date(failedAt).toLocaleString() : "-"}
          />
          <DataField
            label="Replaced Date"
            value={replacedAt ? new Date(replacedAt).toLocaleString() : "-"}
          />
          <DataField
            label="Replaced By"
            value={replacedBy ? replacedBy : "-"}
          />
          <DataField label="Replaces" value={replaces ? replaces : "-"} />
        </Box>
      </Flex>
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
      <Text w={{ base: "140px" }} mr={{ base: "1rem" }} whiteSpace="nowrap">
        {label}
      </Text>
      <Text flex={1} whiteSpace="nowrap">
        {`${isCost ? "$" : ""}${value}`}
      </Text>
    </Flex>
  );
};
