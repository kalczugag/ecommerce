import { Form, FormSpy } from "react-final-form";
import { Button } from "@mui/material";
import SidebarSortForm from "@/forms/SidebarSortForm";

interface SidebarProps {
    config: {
        data: {
            colorsCount: {
                color: string;
                count: number;
            }[];
            availableSizes: string[];
            maxPrice: number;
        };
        disabled?: boolean;
        onSubmit: (values: any) => void;
    };
}

const Sidebar = ({ config }: SidebarProps) => {
    const { onSubmit } = config;

    return (
        <div className="hidden md:block">
            <Form
                onSubmit={onSubmit}
                subscription={{}}
                render={({ handleSubmit }) => (
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col space-y-6 mr-8 z-10 min-w-48 max-w-48"
                    >
                        <h3 className="text-lg text-gray-500 font-semibold">
                            Filters
                        </h3>
                        <div className="border-gray-500">
                            <SidebarSortForm config={config} />
                        </div>
                        <FormSpy subscription={{ dirty: true }}>
                            {({ dirty }) => (
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={!dirty}
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
