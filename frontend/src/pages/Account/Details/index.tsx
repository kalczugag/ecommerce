import { useTitle } from "@/hooks/useTitle";
import { useCurrentUserQuery } from "@/store";

const AccountDetails = () => {
    useTitle("Account Details");

    const { data } = useCurrentUserQuery();

    const keys = Object.keys(data || {});

    return (
        <div className="flex flex-col">
            {data &&
                Object.values(data).map((value, index) => (
                    <p key={index}>
                        {keys[index]}: {value.toString()}
                    </p>
                ))}
        </div>
    );
};

export default AccountDetails;
