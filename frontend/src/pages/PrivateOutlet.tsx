import { useUpdateVisitorCountMutation } from "@/store/apis/summaryApi";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const PrivateOutlet = () => {
    const [updateView] = useUpdateVisitorCountMutation();

    useEffect(() => {
        updateView({});
    }, []);

    return (
        <>
            <Outlet />
        </>
    );
};

export default PrivateOutlet;
