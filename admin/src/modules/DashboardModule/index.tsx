import DefaultLayout from "@/layouts/DefaultLayout";
import SummaryCard from "./components/SummaryCard";
import { Insights, KeyboardArrowRight } from "@mui/icons-material";
import Loading from "@/components/Loading";
import { Button } from "@mui/material";

const DashboardModule = () => {
    return (
        // <Loading isLoading={summaryIsloading || ordersSummaryIsLoading}>
        <DefaultLayout>
            <div className="flex flex-wrap justify-center gap-4">
                <div className="flex flex-wrap gap-4">
                    <SummaryCard
                        label="Users"
                        subLabel="Last 30 days"
                        value="14k"
                        rate={25}
                        data={[0]}
                    />
                    <SummaryCard
                        label="Conversions"
                        subLabel="Last 30 days"
                        value="325"
                        rate={-25}
                        data={[0]}
                    />
                    <SummaryCard
                        label="Event count"
                        subLabel="Last 30 days"
                        value="200k"
                        rate={5}
                        data={[0]}
                    />
                    <SummaryCard
                        label={
                            <div className="space-y-2">
                                <Insights />{" "}
                                <p className="font-semibold">
                                    Explore your data
                                </p>
                            </div>
                        }
                    >
                        <p className="text-sm pt-1">
                            Uncover performance and visitor insights with our
                            data wizardry.
                        </p>
                        <div>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ bgcolor: "#1c2028", mt: 1 }}
                                size="small"
                                endIcon={<KeyboardArrowRight />}
                            >
                                Get insights
                            </Button>
                        </div>
                    </SummaryCard>
                </div>
                <SummaryCard
                    label="Sessions"
                    subLabel="Sessions per day for the last 30 days"
                    value="13,277"
                    rate={35}
                    data={[0]}
                    type="line"
                    size="large"
                />
                <SummaryCard
                    label="Page views"
                    subLabel="Page views from the last 6 months"
                    value="1.3M"
                    rate={-8}
                    data={[0]}
                    type="bar"
                    size="large"
                />
            </div>
        </DefaultLayout>
        // </Loading>
    );
};

export default DashboardModule;
