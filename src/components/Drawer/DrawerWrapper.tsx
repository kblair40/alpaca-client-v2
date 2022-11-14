import { motion } from "framer-motion";
import { useBreakpointValue } from "@chakra-ui/react";

type Props = {
  children: JSX.Element;
  isOpen: boolean;
  position?: "left" | "bottom";
};

const DrawerWrapper = ({ children, isOpen, position }: Props) => {
  const isLeft = position === "left";

  const variants = {
    open: isLeft
      ? { y: 0, x: 0, opacity: 1 }
      : // : { y: "calc(100vh - 180px)", opacity: 1, x: 0 },
        { y: "-112px", opacity: 1, x: 0 },
    // { y: 0, opacity: 1, x: 0 },
    closed: isLeft
      ? { y: 0, x: "-100%", opacity: 0 }
      : { y: "100vh", opacity: 0 },
  };

  const width = useBreakpointValue({ base: "100vw", md: "100%" });
  const height = useBreakpointValue({ base: "180px", md: "100vh" });

  return (
    <motion.div
      animate={isOpen ? "open" : "closed"}
      variants={variants}
      style={{ width, height, minWidth: width }}
      initial={false}
      className="my-drawer"
    >
      {children}
    </motion.div>
  );
};

export default DrawerWrapper;

// const variants = {
//   open: useBreakpointValue<{
//     x?: number;
//     opacity: number;
//     y?: number | string;
//   }>({
//     base: { y: "calc(100vh - 180px)", opacity: 1 },
//     md: { y: 0, x: 0, opacity: 1 },
//   })!,

//   closed: useBreakpointValue<{
//     x?: number | string;
//     opacity: number;
//     y?: number | string;
//   }>({
//     base: { y: "100vh", opacity: 0 },
//     md: { y: 0, x: "-100%", opacity: 0 },
//   })!,
// };
