import { Form } from "react-final-form";
import SortForm from "@/forms/SortForm";
import CrudLayout from "@/layouts/CrudLayout";
import type { ConfigType } from "@/forms/SortForm";

interface CrudModuleProps {
    config: ConfigType[];
    sortFn: (values: any) => void;
}

const CrudModule = ({ config, sortFn }: CrudModuleProps) => {
    const FormContainer = () => (
        <Form
            onSubmit={sortFn}
            render={({ handleSubmit, form }) => (
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4"
                >
                    <SortForm config={config} form={form} />
                </form>
            )}
        />
    );

    return (
        <CrudLayout
            headerPanel={<FormContainer />}
            topLabel="Sort"
            bottomLabel="All Products"
        >
            {/* data table */}
            <div>x</div>
        </CrudLayout>
    );
};

export default CrudModule;
