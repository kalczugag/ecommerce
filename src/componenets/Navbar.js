import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import { VscAccount } from "react-icons/vsc";
import Button from "../componenets/Button";
import Modal from "../componenets/Modal";
import PostsAddForm from "./PostsAddForm";
import PostSearch from "./PostsSearch";
import Cart from "./Cart";
import BottomNavbar from "./BottomNavbar";
import Wishlist from "./Wishlist";

const Navbar = ({ isDev }) => {
    const [showModal, setShowModal] = useState(false);
    const location = useLocation();

    const handleShowModal = () => {
        setShowModal(!showModal);
    };

    const isActiveMen = location.pathname.startsWith("/men-home");
    const isActiveWomen = location.pathname.startsWith("/women-home");
    const menActiveClass = isActiveMen ? "bg-gray-700 hover:bg-gray-600" : "";
    const womenActiveClass = isActiveWomen
        ? "bg-gray-700 hover:bg-gray-600"
        : "";

    const modal = (
        <Modal onClose={handleShowModal} container=".modal-container">
            <PostsAddForm onSubmit={handleShowModal} />
        </Modal>
    );

    return (
        <nav className="relative top-0 left-0 right-0 h-14 bg-gray-800">
            <div className="h-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 flex justify-between items-center">
                <div className="flex flex-row items-center text-white space-x-2">
                    <Link
                        to="/men-home"
                        className={`p-1 px-2 hover:bg-gray-600 ${menActiveClass}`}
                    >
                        Men
                    </Link>
                    <Link
                        to="/women-home"
                        className={`p-1 px-2 hover:bg-gray-600 ${womenActiveClass}`}
                    >
                        Women
                    </Link>
                </div>
                {/* <div>
                    <Link
                        to={isActiveMen ? "/men-home" : "/women-home"}
                        className="text-white font-bold text-2xl py-2 rounded-md"
                    >
                        HOME
                    </Link>
                </div> */}
                <div className="hidden md:block">
                    <div className="relative ml-10 flex space-x-4">
                        {isDev && (
                            <Link
                                to="/admin"
                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Admin
                            </Link>
                        )}
                        {isDev && (
                            <Button
                                primary
                                onClick={handleShowModal}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded"
                            >
                                <GoPlus />
                            </Button>
                        )}
                        {isDev || (
                            <div className="flex flex-row items-center text-white text-2xl">
                                <PostSearch />
                                <Wishlist />
                                <Cart />
                                <Button className="border-0">
                                    <VscAccount />
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <BottomNavbar />
            {showModal && modal}
        </nav>
    );
};

export default Navbar;
