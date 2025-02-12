import DefaultLayout from "@/layouts/DefaultLayout";

interface NotFoundProps {
    title?: string;
}

const NotFound = ({ title = "Not Found" }: NotFoundProps) => {
    return (
        <DefaultLayout>
            <h1 className="text-3xl font-bold">{title}</h1>
        </DefaultLayout>
    );
};

export default NotFound;
