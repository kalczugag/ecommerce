import { useNavigate } from "react-router-dom";
import { omit } from "lodash";
import { useAddUserMutation } from "@/store";
import { useUploadImageMutation } from "@/store";
import { useTitle } from "@/hooks/useTitle";
import CreateForm from "@/components/CreateForm";
import CustomerForm from "@/forms/CustomerForm";
import CrudModule from "@/modules/CrudModule";
import { useHandleMutation } from "@/hooks/useHandleMutation";
import type { UserAddress } from "@/types/User";
import type { MuiTelInputInfo } from "mui-tel-input";

interface FormValues {
    image: HTMLInputElement | null;
    banned?: boolean;
    emailVerified: boolean;
    fullName: string;
    email: string;
    password: string;
    phone?: string;
    address: UserAddress;
}

const CustomersAdd = () => {
    const navigate = useNavigate();
    const { handleMutation } = useHandleMutation();
    const [addUser, result] = useAddUserMutation();

    const [uploadImage, { isLoading }] = useUploadImageMutation();

    useTitle("Customer - Add");

    const handleSubmit = async (values: FormValues) => {
        let avatarPayload;

        // if (values.image instanceof File) {
        //     const { fileId, url } = await uploadImage(values.image).unwrap();
        //     avatarPayload = { imageId: fileId, url };
        // }

        const [firstName, ...lastParts] = values.fullName.trim().split(" ");
        const lastName = lastParts.join(" ");

        const payload = {
            ...omit(values, "image", "fullName", "emailVerified"),
            firstName,
            lastName,
            avatar: avatarPayload,
        };

        console.log(payload);

        // handleMutation({
        //     values: payload,
        //     mutation: addUser,
        //     onSuccess: () => navigate(-1),
        // });
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
