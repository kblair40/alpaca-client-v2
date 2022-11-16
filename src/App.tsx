import { useEffect, useRef, lazy, Suspense } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Box, useColorModeValue, Center, Spinner } from "@chakra-ui/react";

import { fetchUser } from "store/userSlice";
import useSelector from "hooks/useSelector";
import useDispatch from "hooks/useDispatch";
import Home from "pages/Home";
// import Dashboard from "pages/Dashboard";
// import Portfolio from "pages/Portfolio";
import Navbar from "components/Navbar";
// import Admin from "./pages/Admin";
const Admin = lazy(() => import("pages/Admin"));
const Portfolio = lazy(() => import("pages/Portfolio"));
const Dashboard = lazy(() => import("pages/Dashboard"));
const Order = lazy(() => import("pages/Order"));

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
          <Route
            path="/portfolio"
            element={
              <Suspense fallback={<Loading />}>
                <Portfolio />
              </Suspense>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={<Loading />}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path="/order/:orderId"
            element={
              <Suspense fallback={<Loading />}>
                <Order />
              </Suspense>
            }
          />
          <Route
            path="/admin"
            element={
              <Suspense fallback={<Loading />}>
                <Admin />
              </Suspense>
            }
          />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;

const Loading = () => (
  <Center h="calc(100vh - 60px)">
    <Spinner />
  </Center>
);
