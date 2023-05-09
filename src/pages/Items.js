import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchPosts, removePost } from "../store";
import { useThunk } from "../hooks/use-thunk";
import SortableTable from "../componenets/SortableTable";
import Button from "../componenets/Button";
import { GoTrashcan } from "react-icons/go";

const Items = () => {
    const [doRemovePost, removeLoading] = useThunk(removePost);
    const [doFetchPost] = useThunk(fetchPosts);
    const data = useSelector((state) => state.posts.data) || [];

    useEffect(() => {
        doFetchPost();
    }, [doFetchPost]);

    const config = [
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

    const handleRemoveItem = (item) => {
        doRemovePost(item);
    };

    const keyFn = (data) => {
        return data.id;
    };

    return (
        <div>
            <SortableTable config={config} data={data} keyFn={keyFn} />
        </div>
    );
};

export default Items;
