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
} from "@chakra-ui/react";
import axios from "axios";

import { AlpacaLogoIcon } from "utils/icons";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const baseURL = "https://app.alpaca.markets";
const redirectURI = "http://localhost:4000/";
const scope = "data trading account:write";
const clientSecret = process.env.REACT_APP_ALPACA_CLIENT_SECRET!;
const clientID = process.env.REACT_APP_ALPACA_CLIENT_ID!;

const AlpacaAuthModal = ({ isOpen, onClose }: Props) => {
  const [loading, setLoading] = useState(false);

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
    console.log("\n\n", { body });

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
      console.log("\n\nCODE:", code);
    } catch (e) {
      console.log("FAILED TO GET CODE:", e);
      setLoading(false);
      return;
    }

    if (code) {
      try {
        const token = await requestAlpacaToken(code);
        if (token) {
          console.log("TOKEN:", token);
          setLoading(false);
        }
      } catch (e) {
        console.log("ERROR:", e);
        setLoading(false);
      }
    } else {
      console.log("DONE LOADING");
      setLoading(false);
    }
  };

  const openAlpacaPopUp = (uri: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const authWindow = window.open(uri);

      interval.current = setInterval(async () => {
        try {
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

            if (code && code.code) {
              resolve(code.code);
            } else {
              reject("Something went wrong");
            }

            if (interval.current) {
              clearInterval(interval.current);
            }
          }
        } catch (e) {
          reject("Something went wrong");
        }
      }, 100);
    });
  };

  const modalBg = useColorModeValue("gray.50", "gray.900");

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={{ base: "xs", sm: "md" }}>
      <ModalOverlay />
      <ModalContent bg={modalBg} top="2rem">
        <ModalHeader textAlign="center">
          Your Alpaca account is not connected!
        </ModalHeader>

        <ModalBody>
          <Text textAlign="center">Connect your account to use this app</Text>
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
              onClick={connectToAlpaca}
              isLoading={loading}
            >
              Connect Now
            </Button>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AlpacaAuthModal;
