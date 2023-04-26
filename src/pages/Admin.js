import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useThunk } from "../hooks/use-thunk";
import { fetchPosts } from "../store";
import Table from "../componenets/Table";

const Admin = ({ devFn }) => {
    const [doFetchPosts] = useThunk(fetchPosts);
    const { data } = useSelector((state) => {
        return state.posts;
    });

    useEffect(() => {
        doFetchPosts();
    }, [doFetchPosts]);

    const config = [
        {
            label: "Item",
            render: (item) => item.title,
            sortValue: (item) => item.title,
        },
        {
            label: "Description",
            render: (item) => item.description,
            sortValue: (item) => item.description,
        },
        {
            label: "Price",
            render: (item) => `$${item.price}`,
            sortValue: (item) => item.price,
        },
        {
            label: "Image (T or F)",
            render: (item) => (item.image ? "T" : "F"),
            sortValue: (item) => item.image,
        },
    ];

    return (
        <div className="flex flex-col">
            <Table config={config} data={data} />
        </div>
    );
};

export default Admin;
