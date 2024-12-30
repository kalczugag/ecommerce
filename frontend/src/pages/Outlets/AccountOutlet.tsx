import { Outlet, useLocation } from "react-router-dom";
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
                <Outlet />
            </div>
        </DefaultLayout>
    );
};

export default AccountOutlet;
