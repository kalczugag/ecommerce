import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { changeDevMode } from "../store";

const useChangeDevMode = () => {
    const dispatch = useDispatch();

    const handleChangeDevMode = useCallback(
        (arg) => {
            dispatch(changeDevMode(arg));
        },
        [dispatch]
    );

    return handleChangeDevMode;
};

export default useChangeDevMode;
