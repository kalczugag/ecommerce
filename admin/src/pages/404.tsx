import { useTitle } from "@/hooks/useTitle";
import DefaultLayout from "@/layouts/DefaultLayout";

const NotFound = () => {
    useTitle("Page not found");

    return (
        <DefaultLayout>
            <h1>Page not found</h1>
        </DefaultLayout>
    );
};

export default NotFound;
