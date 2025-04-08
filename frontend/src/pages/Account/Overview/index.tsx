import { useNavigate } from "react-router-dom";
import { useTitle } from "@/hooks/useTitle";
import DefaultLayout from "@/layouts/DefaultLayout";
import { Button } from "@mui/material";

const AccountOverview = () => {
    useTitle("Account Overview");

    const navigate = useNavigate();

    return (
        <DefaultLayout
            marginY={false}
            topContent={<h1 className="text-2xl font-bold">Hello!</h1>}
            className="flex flex-col items-center"
        >
            <p>This is your account overview</p>
            <p>Here you can manage your orders, preferences and more</p>
            <div className="mt-10">
                <Button
                    color="inherit"
                    variant="outlined"
                    onClick={() => navigate("/men")}
                >
                    Continue Shopping
                </Button>
            </div>
        </DefaultLayout>
    );
};

export default AccountOverview;
