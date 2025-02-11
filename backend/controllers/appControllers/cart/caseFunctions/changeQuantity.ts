import { BaseItemModel } from "../../../../models/BaseItem";
import { ProductModel } from "../../../../models/Product";
import type { Item } from "../../../../types/Order";
import type { CartDocument } from "../../../../types/Cart";
import type { HandleAddResult } from "../update";

export const handleChangeQuantity = async (
    cart: CartDocument,
    itemToChange: Item
): Promise<HandleAddResult> => {
    try {
        const baseItem = await BaseItemModel.findById(itemToChange._id);
        if (!baseItem) {
            return {
                success: false,
                message: "Item not found",
            };
        }

        const product = await ProductModel.findById(baseItem._product)
            .select("size")
            .exec();

        if (!product) {
            return {
                success: false,
                message: "Product not found",
            };
        }

        const sizeIndex = product.size.findIndex(
            (s) => s.name === baseItem.size
        );

        if (sizeIndex < 0) {
            return {
                success: false,
                message: "Size not found",
            };
        }

        const updatedQuantity = itemToChange.quantity;
        const updatedTotal = baseItem.unitPrice * updatedQuantity;

        if (product.size[sizeIndex].quantity < updatedQuantity) {
            return {
                success: false,
                message: "Insufficient stock",
            };
        }

        const updatedItem = await BaseItemModel.findByIdAndUpdate(
            itemToChange._id,
            { quantity: updatedQuantity, total: updatedTotal },
            { new: true }
        );

        if (!updatedItem) {
            return {
                success: false,
                message: "Failed to update item",
            };
        }

        (cart.items as Item[]) = (cart.items as Item[]).map((item) =>
            item._id?.toString() === itemToChange._id?.toString()
                ? updatedItem
                : item
        );

        await cart.save();

        return {
            success: true,
            message: "Item quantity updated successfully",
            updatedCart: cart,
        };
    } catch (error) {
        return {
            success: false,
            message: `Error changing item quantity: ${error}`,
        };
    }
};
