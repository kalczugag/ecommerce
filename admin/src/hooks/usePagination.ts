import { useAppSelector } from "./useStore";

export const usePagination = () => {
    const { page, pageSize } = useAppSelector((state) => state.table);

    return { page, pageSize };
};
