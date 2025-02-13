import { useGetCategoriesByLevelQuery, useGetCurrentUserQuery } from "@/store";
import PreferencesModule from "@/modules/AccountModule/PreferencesModule";

const AccountPreferences = () => {
    const { data: categoriesData, isLoading: categoriesLoading } =
        useGetCategoriesByLevelQuery("topLevel");
    const { data: currentUser, isLoading: currentUserLoading } =
        useGetCurrentUserQuery();

    const formattedData = categoriesData?.result.map((item) => ({
        _id: item._id || "",
        label: item.name,
    }));

    const config = {
        data: formattedData || [],
        userId: currentUser?._id || "",
        currentPreferences: currentUser?.preferences || [],
        isInitialLoading: categoriesLoading || currentUserLoading,
    };

    return <PreferencesModule config={config} />;
};

export default AccountPreferences;
