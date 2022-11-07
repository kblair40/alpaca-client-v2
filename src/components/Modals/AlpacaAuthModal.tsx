import { useState, useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useColorModeValue,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

import { type Status } from "components/Navbar/AlpacaButton";
import { AlpacaLogoIcon } from "utils/icons";

type Props = {
  isOpen: boolean;
  onClose: (status: Status) => void;
  isAuthenticated: boolean;
};

const baseURL = "https://app.alpaca.markets";
const redirectURI = "http://localhost:4000/";
const scope = "data trading account:write";
const clientSecret = process.env.REACT_APP_ALPACA_CLIENT_SECRET!;
const clientID = process.env.REACT_APP_ALPACA_CLIENT_ID!;

const AlpacaAuthModal = ({ isOpen, onClose, isAuthenticated }: Props) => {
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const interval = useRef<NodeJS.Timeout | null>(null);

  const requestAlpacaToken = async (code: string) => {
    const body: { [key: string]: string | number } = {
      grant_type: "authorization_code",
      redirect_uri: redirectURI,
      client_id: clientID,
      client_secret: clientSecret,
      code,
    };

    // encode data into form encoding
    const encodedBody = Object.keys(body)
      .map((key) => `${key}=${encodeURIComponent(body[key])}`)
      .join("&");

    let response: any;
    try {
      response = await axios({
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "POST",
        url: "https://api.alpaca.markets/oauth/token",
        data: encodedBody,
      });
    } catch (e) {
      console.log("\nFAILED CONNECTING TO ALPACA:", e);
    }

    const { data } = response;
    console.log("\n\nTOKEN REQUEST RESPONSE:", data, "\n\n");

    window.localStorage.setItem("alpaca-token", data.access_token);

    return data.access_token;
  };

  const connectToAlpaca = async () => {
    setLoading(true);
    const connectURL =
      `${baseURL}/oauth/authorize?` +
      `response_type=code&` +
      `client_id=${clientID}&` +
      `redirect_uri=${redirectURI}&` +
      `scope=${scope}`;

    let code: any;
    try {
      code = await openAlpacaPopUp(connectURL);
      // console.log("\n\nCODE:", code);
    } catch (e) {
      console.log("FAILED TO GET CODE:", e);
      showToast("error");
      setLoading(false);
      onClose("error");
      return;
    }

    if (code) {
      try {
        const token = await requestAlpacaToken(code);
        if (token) {
          // console.log("TOKEN:", token);
          showToast("success");
          setLoading(false);
          onClose("success");
        }
      } catch (e) {
        // console.log("ERROR3:", e);
        setLoading(false);
      }
    } else {
      // console.log("DONE LOADING: NO CODE");
      showToast("error");
      setLoading(false);
      onClose("error");
    }
  };

  const openAlpacaPopUp = (uri: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const authWindow = window.open(uri);

      interval.current = setInterval(async () => {
        let snippet =
          authWindow && authWindow.location && authWindow.location.search;

        if (snippet) {
          const rawCode = snippet.substring(1);

          const code: { [key: string]: string } = JSON.parse(
            '{"' + rawCode.replace(/&/g, '","').replace(/=/g, '":"') + '"}',

            function (key, value) {
              return key === "" ? value : decodeURIComponent(value);
            }
          );

          if (authWindow) authWindow.close();

          // console.log("\n\nCODE:", code);
          if (code && code.code) {
            // console.log("RESOLVING:");
            resolve(code.code);
          } else {
            // console.log("ERROR1:");
            reject(code.error ? code.error : "Something went wrong");
          }

          if (interval.current) {
            clearInterval(interval.current);
          }
        } else {
          // console.log("\n\nWINDOW CLOSED\n\n");
          reject("Window closed");
          if (interval.current) {
            clearInterval(interval.current);
          }
        }
      }, 100);
    });
  };

  const showToast = (connectionStatus: "success" | "error") => {
    const isError = connectionStatus === "error";
    const title = isError
      ? "Failed to connect"
      : "Successfully connected to Alpaca!";
    const description = isError
      ? "Please try again"
      : "You can now place trades, view/manage orders and research equities";
    const duration = 9000;
    const status = isError ? "error" : "success";

    toast({ title, description, duration, status, isClosable: true });
  };

  const modalBg = useColorModeValue("gray.50", "gray.900");

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => onClose(null)}
      size={{ base: "xs", sm: "md" }}
    >
      <ModalOverlay />
      <ModalContent bg={modalBg} top="2rem">
        <ModalHeader textAlign="center">
          {!isAuthenticated
            ? "Your Alpaca account is not connected!"
            : "Your Alpaca account is connected!"}
        </ModalHeader>

        <ModalBody>
          <Text textAlign="center">
            {!isAuthenticated
              ? "Connect your account to use this app"
              : "You may disconnect your account, but you will no longer be able to trade, research, or view your Alpaca account data."}
          </Text>
          <ModalFooter>
            <Button
              size="lg"
              w="100%"
              bg="alpaca.500"
              color="gray.900"
              _hover={{ bg: "alpaca.600" }}
              _active={{ bg: "alpaca.700" }}
              _loading={{ pointerEvents: "none" }}
              leftIcon={<AlpacaLogoIcon boxSize="24px" fill="gray.900" />}
              onClick={
                !isAuthenticated
                  ? connectToAlpaca
                  : () => onClose("disconnected")
              }
              isLoading={loading}
            >
              {!isAuthenticated ? "Connect Now" : "Disconnect"}
            </Button>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AlpacaAuthModal;
