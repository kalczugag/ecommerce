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
        content = <Skeleton times={4} className="w-64 h-72" />;
    } else if (error) {
        content = <div>Error fetching data.</div>;
    } else {
        content = data.map((post) => {
            return <PostsListItem key={post.id} post={post} />;
        });
    }

    return (
        <div className="grid grid-cols-4 gap-14 sm:grid-rows-auto">
            {content}
        </div>
    );
};

const PostsListContainer = () => {
    return (
        <div style={{ overflow: "hidden", maxWidth: "100vw" }}>
            <div className="flex justify-center mt-16">
                <PostsList />
            </div>
        </div>
    );
};

export default PostsListContainer;
