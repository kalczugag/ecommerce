import { Form, FormSpy } from "react-final-form";
import { useQueryParams } from "@/hooks/useQueryParams";
import { Button, IconButton } from "@mui/material";
import SidebarSortForm from "@/forms/SidebarSortForm";
import { Close } from "@mui/icons-material";
import type { ProductFilters } from "@/types/Product";
import { useEffect } from "react";

interface SidebarProps {
    config: {
        data?: ProductFilters;
        disabled?: boolean;
    };
}

const Sidebar = ({ config }: SidebarProps) => {
    const { data } = config;

    const [searchParams, setSearchParams, clearSearchParams] = useQueryParams();
    const filters = Object.fromEntries(searchParams.entries());

    const handleSubmit = (values: any) => {
        setSearchParams(values);
    };

    useEffect(() => {
        console.log(filters);
    }, [filters]);

    return (
        <div className="hidden md:block">
            <Form
                onSubmit={handleSubmit}
                subscription={{}}
                render={({ handleSubmit, form, pristine }) => (
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col space-y-6 mr-8 z-10 min-w-48 max-w-48"
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg text-gray-500 font-semibold">
                                Filters
                            </h3>
                            {Object.entries(filters).length > 0 && (
                                <IconButton
                                    onClick={() => {
                                        clearSearchParams();
                                        form.reset();
                                    }}
                                >
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
