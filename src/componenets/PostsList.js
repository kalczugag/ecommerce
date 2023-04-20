import PostsListItem from "./PostsListItem";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useThunk } from "../hooks/use-thunk";
import { fetchPosts } from "../store";

const PostsList = () => {
    const [doFetchUsers, isLoading, error] = useThunk(fetchPosts);
    const { data } = useSelector((state) => {
        return state.posts;
    });

    console.log(data);

    useEffect(() => {
        doFetchUsers();
    }, [doFetchUsers]);

    return (
        <div>
            <div>postsList</div>
        </div>
    );
};

export default PostsList;
