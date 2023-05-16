import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchPosts, removePost, changePostSearchTerm } from "../store";
import { useThunk } from "../hooks/use-thunk";
import { GoTrashcan } from "react-icons/go";
import SortableTable from "../componenets/SortableTable";
import Button from "../componenets/Button";
import SearchBar from "../componenets/SearchBar";

const Items = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [doRemovePost, removeLoading] = useThunk(removePost);
    const [doFetchPost] = useThunk(fetchPosts);

    const { posts } = useSelector(({ posts: { data, searchTerm } }) => {
        const filteredPosts = data.filter((post) =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return {
            posts: filteredPosts,
        };
    });
    const totalItems = posts.length;
    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = posts.slice(firstItemIndex, lastItemIndex);

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

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const keyFn = (data) => {
        return data.id;
    };

    return (
        <div className="bg-white rounded-lg px-4 overflow-x-auto">
            <div>
                <SearchBar
                    type="text"
                    placeholder="Search by Item"
                    search={changePostSearchTerm}
                    what="posts"
                />
            </div>
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <SortableTable
                    data={currentItems}
                    config={config}
                    keyFn={keyFn}
                />
            </div>
            <div className="flex justify-center mt-4">
                {pageNumbers.map((pageNumber) => (
                    <Button
                        key={pageNumber}
                        className={`mx-1 px-3 py-1 rounded ${
                            currentPage === pageNumber
                                ? "bg-blue-500 text-white"
                                : ""
                        }`}
                        onClick={() => paginate(pageNumber)}
                    >
                        {pageNumber}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default Items;
