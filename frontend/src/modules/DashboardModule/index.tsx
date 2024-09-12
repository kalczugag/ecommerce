import { Typography } from "@mui/material";
import DefaultLayout from "@/layouts/DefaultLayout";

const DashboardModule = () => {
    return (
        <DefaultLayout
            featuredElement={
                <Typography
                    variant="h1"
                    component="h1"
                    sx={{ textAlign: "center" }}
                >
                    test
                </Typography>
            }
        >
            <div className="text-xl text-center shadow-md border-y p-10">
                here will be a slider
            </div>
        </DefaultLayout>
    );
};

export default DashboardModule;
