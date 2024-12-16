import { BaseItemModel } from "../../../models/BaseItem";
import type { Item } from "../../../types/Order";
import type { CartDocument } from "../../../types/Cart";
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

        const updatedQuantity = itemToChange.quantity;
        const updatedTotal = baseItem.unitPrice * updatedQuantity;

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
