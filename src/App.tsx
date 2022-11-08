import { useEffect, useRef } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Box, useColorModeValue } from "@chakra-ui/react";

import { fetchUser } from "store/userSlice";
import useSelector from "hooks/useSelector";
import useDispatch from "hooks/useDispatch";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import Navbar from "components/Navbar";

function App() {
  const mainBg = useColorModeValue("#fff", "gray.900");

  const { authenticated } = useSelector((st) => st.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    if (!authenticated.local) navigate("/");
  }, [authenticated, navigate]);

  const didFetch = useRef(false);
  useEffect(() => {
    if (!didFetch.current) {
      dispatch(fetchUser());
      didFetch.current = true;
    }
  }, [dispatch]);

  return (
    <Box minH="100vh" bg={mainBg}>
      <Navbar />
      <Box h="calc(100vh - 60px)" w="100%" position="relative" top="60px">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
