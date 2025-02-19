import { BaseItemModel } from "../../../../models/BaseItem";
import type { Item } from "../../../../types/Order";
import type { CartDocument } from "../../../../types/Cart";
import type { HandleAddResult } from "../update";

export const handleDelete = async (
    cart: CartDocument,
    itemToRemove: Item
): Promise<HandleAddResult> => {
    try {
        const updatedItems = (cart.items as Item[]).filter(
            (item) => item._id?.toString() !== itemToRemove._id?.toString()
        );

        await BaseItemModel.findByIdAndDelete(itemToRemove._id);

        (cart.items as Item[]) = updatedItems;
        await cart.save();

        return {
            success: true,
            message: "Item successfully removed from cart",
            updatedCart: cart,
        };
    } catch (error) {
        return {
            success: false,
            message: `Error removing item: ${error}`,
        };
    }
};
