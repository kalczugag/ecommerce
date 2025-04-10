import { useAppDispatch } from "@/hooks/useStore";
import { logOut, useRefreshTokenQuery } from "@/store";
import { ReactNode, useEffect, useState } from "react";

const SessionInitializer = ({ children }: { children: ReactNode }) => {
    const dispatch = useAppDispatch();
    const [ready, setReady] = useState(false);

    const { isSuccess, isError, isUninitialized, isFetching } =
        useRefreshTokenQuery();

    useEffect(() => {
        if (isSuccess || isError) {
            if (isError) dispatch(logOut());
            setReady(true);
        }
    }, []);

    if (!ready && (isUninitialized || isFetching)) {
        return null;
    }

    return <>{children}</>;
};

export default SessionInitializer;
