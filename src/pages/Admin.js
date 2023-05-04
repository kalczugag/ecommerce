import { Outlet } from "react-router-dom";
import { useThunk } from "../hooks/use-thunk";
import { removePost } from "../store";
import { GoTrashcan } from "react-icons/go";
import Sidebar from "../componenets/Sidebar";
import Button from "../componenets/Button";

let config = [];

const Admin = () => {
    const [doRemovePost, removeLoading] = useThunk(removePost);

    const handleRemoveItem = (item) => {
        doRemovePost(item);
    };

    config = [
        {
            label: "Item",
            render: (item) => item.title,
        },
        {
            label: "Description",
            render: (item) => item.description,
        },
        {
            label: "Price",
            render: (item) => `$${item.price}`,
            sortValue: (item) => item.price,
        },
        {
            label: "Image (T or F)",
            render: (item) => (item.image ? "T" : "F"),
            sortValue: (item) => (item.image ? "T" : "F"),
        },
        {
            label: "Delete",
            render: (item) => (
                <Button
                    onClick={() => handleRemoveItem(item)}
                    loading={removeLoading}
                >
                    <GoTrashcan />
                </Button>
            ),
        },
    ];

    return (
        <div className="flex flex-row">
            <Sidebar />
            <Outlet />
        </div>
    );
};

export default Admin;
export { config };
