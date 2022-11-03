import { useDispatch as useReduxDispatch } from "react-redux";
import type { AppDispatch } from "store";

const useDispatch: () => AppDispatch = useReduxDispatch;

export default useDispatch;
