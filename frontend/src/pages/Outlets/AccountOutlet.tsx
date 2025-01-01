import { Outlet } from "react-router-dom";
import NavLinksMenu from "@/components/NavLinksMenu";
import DefaultLayout from "@/layouts/DefaultLayout";
import { config } from "../Account/config";

const AccountOutlet = () => {
    return (
        <DefaultLayout direction="row" className="space-x-14">
            <div className="print:hidden">
                <NavLinksMenu links={config} />
            </div>
            <div className="flex-1">
                <p className="font-semibold text-gray-400 italic">
                    this page is not responsible for now due to sidebar
                </p>
                <Outlet />
            </div>
        </DefaultLayout>
    );
};

export default AccountOutlet;
