import PostsList from "./componenets/PostsList";
import PostsSearch from "./componenets/PostsSearch";
import Modal from "./componenets/Modal";
import PostsForm from "./componenets/PostsForm";
import Button from "./componenets/Button";
import { useState } from "react";

const App = () => {
    const [showModal, setShowModal] = useState(true);

    const handleShowModal = () => {
        setShowModal(!showModal);
    };

    const handleAddPost = () => {
        setShowModal(!showModal);
        //dispatch addPost
    };

    const actionBar = (
        <div>
            <Button onClick={handleAddPost}>Add Post</Button>
        </div>
    );

    const modal = (
        <Modal onClose={handleShowModal} actionBar={actionBar}>
            <PostsForm />
        </Modal>
    );

    return (
        <div>
            <PostsList />
            <PostsSearch />
            <Button primary onClick={handleShowModal}>
                Add Post
            </Button>
            {showModal && modal}
        </div>
    );
};

export default App;
