import { useDispatch } from "react-redux";
import { clearMessage, setMessage } from "./toastSlice";

const useToast = () => {
  const dispatch = useDispatch();
  const showToast = (message) => {
    dispatch(setMessage({ message }));
    setTimeout(() => {
      dispatch(clearMessage({ message: "" }));
    }, 3000);
  };
  return { showToast };
};
export default useToast;
