import { useAppSelector } from "./useStore";

const useAuth = () => {
    const user = useAppSelector((state) => state.auth);

    return user;
};

export default useAuth;
