import { useSelector } from "react-redux";

const useDevState = () => {
    return useSelector((state) => state.admin.isDev);
};

export default useDevState;
