import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useThunk } from "../hooks/use-thunk";
import { fetchPosts } from "../store";
import PostsListItem from "./PostsListItem";
import Skeleton from "./Skeleteon";

const PostsList = () => {
    const [doFetchPosts, isLoading, error] = useThunk(fetchPosts);
    const { posts } = useSelector(({ posts: { data, searchTerm } }) => {
        const filteredPosts = data.filter((post) =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return {
            posts: filteredPosts,
        };
    });

    useEffect(() => {
        doFetchPosts();
    }, [doFetchPosts]);

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
        content = posts.map((post) => {
            return <PostsListItem key={post.id} post={post} />;
        });
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-screen-xl mx-auto px-4">
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
