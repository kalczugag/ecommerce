import { useTitle } from "@/hooks/useTitle";
import { useCurrentUserQuery } from "@/store";

const AccountDetails = () => {
    useTitle("Account Details");

    const { data } = useCurrentUserQuery();

    return (
        <div className="flex flex-col">
            {data &&
                Object.entries(data).map(([key, value], index) => (
                    <p key={index}>
                        {key}: {JSON.stringify(value)}
                    </p>
                ))}
        </div>
    );
};

export default AccountDetails;
