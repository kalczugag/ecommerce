import DefaultLayout from "@/layouts/DefaultLayout";
import SummaryCard from "./components/SummaryCard";
import PreviewCard from "./components/PreviewCard";
import {
    LocalShippingOutlined,
    PeopleOutlineOutlined,
    AttachMoneyOutlined,
    ShoppingCartOutlined,
} from "@mui/icons-material";

const DashboardModule = () => {
    const content = [
        {
            title: "Sales",
            value: 2.382,
            summary: -3.65,
            icon: <LocalShippingOutlined />,
        },
        {
            title: "Visitors",
            value: 2.382,
            summary: 5.25,
            icon: <PeopleOutlineOutlined />,
        },
        {
            title: "Earnings",
            value: 2.382,
            summary: 6.65,
            icon: <AttachMoneyOutlined />,
        },
        {
            title: "Orders",
            value: 2.382,
            summary: -2.25,
            icon: <ShoppingCartOutlined />,
        },
    ];

    return (
        <DefaultLayout className="flex flex-col ">
            <div className="flex flex-row">
                <div className="grid gap-2 sm:grid-cols-2">
                    {content.map((item, index) => (
                        <SummaryCard key={index} {...item} />
                    ))}
                </div>
                {/* <div>
                    <PreviewCard />
                </div> */}
            </div>
        </DefaultLayout>
    );
};

export default DashboardModule;
