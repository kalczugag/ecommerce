import { Form } from "react-final-form";
import { useUpdateUserMutation } from "@/store";
import { enqueueSnackbar } from "notistack";
import { LoadingButton } from "@mui/lab";
import AccountLayout from "@/layouts/AccountLayout";
import MultiSelect from "./components/MultiSelect";
import Loading from "@/components/Loading";

interface PreferencesModuleProps {
    config: {
        data: {
            _id: string;
            label: string;
        }[];
        userId: string;
        currentPreferences: string[];
        isInitialLoading: boolean;
    };
}

const PreferencesModule = ({ config }: PreferencesModuleProps) => {
    const { data, userId, currentPreferences, isInitialLoading } = config;

    const [updateUser, { isLoading }] = useUpdateUserMutation();

    const handleSubmit = async (values: { preferences: string[] }) => {
        try {
            await updateUser({
                _id: userId,
                preferences: values.preferences,
            }).unwrap();

            enqueueSnackbar("Preferences saved successfully", {
                variant: "success",
            });
        } catch (error) {
            enqueueSnackbar("Failed to save preferences", { variant: "error" });
        }
    };

    return (
        <AccountLayout
            label="Personalize your experience"
            subLabel="Let us know what you like to help us suggest the best products for you"
        >
            <Form
                initialValues={{ preferences: currentPreferences }}
                onSubmit={handleSubmit}
                render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col items-start space-y-4">
                            <MultiSelect
                                name="preferences"
                                data={data}
                                isLoading={isInitialLoading}
                            />
                            <LoadingButton
                                type="submit"
                                variant="contained"
                                loading={isLoading}
                                disabled={isInitialLoading}
                            >
                                Save
                            </LoadingButton>
                        </div>
                    </form>
                )}
            />
        </AccountLayout>
    );
};

export default PreferencesModule;
