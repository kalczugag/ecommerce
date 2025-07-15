import { useNavigate } from "react-router-dom";
import { useAddUserMutation } from "@/store";
import { enqueueSnackbar } from "notistack";
import { useUploadImageMutation } from "@/store";
import { useTitle } from "@/hooks/useTitle";
import CreateForm from "@/components/CreateForm";
import CustomerForm from "@/forms/CustomerForm";
import CrudModule from "@/modules/CrudModule";

interface FormValues {
    image: HTMLInputElement | null;
    banned?: boolean;
    emailVerified: boolean;
    fullName: string;
    email: string;
    password: string;
}

const CustomersAdd = () => {
    const navigate = useNavigate();
    const [addCategory, result] = useAddUserMutation();

    const [uploadImage, { isLoading }] = useUploadImageMutation();

    useTitle("Customer - Add");

    const handleSubmit = async (values: FormValues) => {
        let avatarPayload;

        if (values.image instanceof File) {
            const { fileId, url } = await uploadImage(values.image).unwrap();
            avatarPayload = { imageId: fileId, url };
        }

        console.log(avatarPayload);

        // try {
        //     await addCategory(values).unwrap();
        //     navigate(-1);
        //     enqueueSnackbar("Customer added successfully", {
        //         variant: "success",
        //     });
        // } catch (error) {
        //     enqueueSnackbar("Failed to add customer", { variant: "error" });
        // }
    };

    return (
        <CrudModule
            actionForm={
                <CreateForm
                    handleSubmit={handleSubmit}
                    initialValues={{ emailVerified: false }}
                    isLoading={result.isLoading || isLoading}
                    buttonText="Create customer"
                    formElements={<CustomerForm isLoading={result.isLoading} />}
                />
            }
        />
    );
};

export default CustomersAdd;
