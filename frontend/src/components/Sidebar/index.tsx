import { Form, FormSpy } from "react-final-form";
import { Button, IconButton } from "@mui/material";
import SidebarSortForm from "@/forms/SidebarSortForm";
import type { ProductFilters } from "@/types/Product";
import useFilters from "@/hooks/useFilters";
import { Close } from "@mui/icons-material";

interface SidebarProps {
    config: {
        data: ProductFilters;
        disabled?: boolean;
        onSubmit: (values: any) => void;
    };
}

// to remove
const Sidebar = ({ config }: SidebarProps) => {
    const { onSubmit, data } = config;
    const { filters, clearFilters } = useFilters();

    return (
        <div className="hidden md:block">
            <Form
                onSubmit={onSubmit}
                subscription={{}}
                initialValues={filters}
                render={({ handleSubmit, pristine }) => (
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col space-y-6 mr-8 z-10 min-w-48 max-w-48"
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg text-gray-500 font-semibold">
                                Filters
                            </h3>
                            {Object.entries(filters).length > 0 && (
                                <IconButton onClick={clearFilters}>
                                    <Close />
                                </IconButton>
                            )}
                        </div>
                        <div className="border-gray-500">
                            <SidebarSortForm config={{ data }} />
                        </div>
                        <FormSpy subscription={{ dirty: true }}>
                            {({ dirty }) => (
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={pristine || !dirty}
                                >
                                    Apply
                                </Button>
                            )}
                        </FormSpy>
                    </form>
                )}
            />
        </div>
    );
};

export default Sidebar;
