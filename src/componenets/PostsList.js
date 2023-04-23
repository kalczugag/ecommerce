import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useThunk } from "../hooks/use-thunk";
import { fetchPosts } from "../store";
import PostsListItem from "./PostsListItem";
import Skeleton from "./Skeleteon";

const PostsList = () => {
    const [doFetchUsers, isLoading, error] = useThunk(fetchPosts);
    const { data } = useSelector((state) => {
        return state.posts;
    });

    useEffect(() => {
        doFetchUsers();
    }, [doFetchUsers]);

    let content;
    if (isLoading) {
        content = <Skeleton times={4} className="w-full h-full" />;
    } else if (error) {
        content = (
            <div className="text-center text-red-500 py-4">
                Error fetching data.
            </div>
        );
    } else {
        content = data.map((post) => {
            return <PostsListItem key={post.id} post={post} />;
        });
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-screen-lg mx-auto px-4">
            {content}
        </div>
    );
};

const PostsListContainer = () => {
    return (
        <div style={{ overflow: "hidden" }}>
            <div className="flex justify-center mt-16">
                <PostsList />
            </div>
        </div>
    );
};

export default PostsListContainer;
