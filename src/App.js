import PostsList from "./componenets/PostsList";
import PostsSearch from "./componenets/PostsSearch";
import Modal from "./componenets/Modal";
import PostsForm from "./componenets/PostsForm";
import Button from "./componenets/Button";
import { useState } from "react";

const App = () => {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(!showModal);
    };

    const modal = (
        <Modal onClose={handleShowModal}>
            <PostsForm onSubmit={handleShowModal} />
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
