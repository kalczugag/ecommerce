import { CategoryModel } from "../models/Categories";

export const generateSKU = async (product: any): Promise<string> => {
    const topLevelCategory = await CategoryModel.findById(
        product.topLevelCategory
    );
    const topLevelCategoryName = topLevelCategory
        ? topLevelCategory.name.substring(0, 3).toUpperCase()
        : "UNK";
    const brandCode = product.brand.substring(0, 3).toUpperCase();
    const colorCode = product.color.substring(0, 3).toUpperCase();
    const sizeCode =
        product.size && product.size[0]
            ? product.size[0].name.substring(0, 2).toUpperCase()
            : "";
    const uniqueID = product._id ? product._id.toString().slice(-6) : "000000";

    return `${brandCode}${colorCode}${sizeCode}${topLevelCategoryName}${uniqueID}`;
};
