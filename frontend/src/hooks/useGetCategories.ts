import { useParams } from "react-router-dom";

export const useGetCategory = () => {
    const {
        topLevel = "",
        secondLevel = "",
        thirdLevel = "",
    } = useParams<Record<string, string>>();

    const category = [topLevel, secondLevel, thirdLevel]
        .filter(Boolean)
        .join(",");

    return category;
};
