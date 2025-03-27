import { Link, useLocation } from "react-router-dom";
import { useTitle } from "@/hooks/useTitle";
import DefaultLayout from "@/layouts/DefaultLayout";

const NotFound = () => {
    useTitle("Page not found");

    const { pathname } = useLocation();

    return (
        <DefaultLayout className="flex justify-center items-center">
            <div className="flex flex-col items-start">
                <Link to="/" className="-ml-3">
                    <img
                        src="/icons/logo.svg"
                        alt="logo"
                        style={{ height: "120px" }}
                    />
                </Link>
                <div className="flex flex-col space-y-4 max-w-96">
                    <p className="flex items-center">
                        <strong>404.&nbsp;</strong>
                        <span className="text-gray-600">That's an error</span>
                    </p>
                    <p>
                        The requested URL {pathname} was not found on this
                        server.
                    </p>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default NotFound;
