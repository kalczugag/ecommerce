import { BaseItemModel } from "../../../models/BaseItem";
import type { Item } from "../../../types/Order";
import type { CartDocument } from "../../../types/Cart";
import type { HandleAddResult } from "../update";

export const handleAdd = async (
    cart: CartDocument,
    newItem: Item
): Promise<HandleAddResult> => {
    try {
        const cartItems = cart.items as Item[];

        const itemExists = cartItems.find(
            (item) =>
                item._product?.toString() === newItem._product &&
                item.color === newItem.color &&
                item.size === newItem.size
        );

        if (itemExists) {
            itemExists.quantity += newItem.quantity;
        } else {
            const newBaseItem = new BaseItemModel(newItem);
            await newBaseItem.save();

            cartItems.push(newBaseItem);
        }

        await cart.save();

        return {
            success: true,
            message: "Item successfully added to cart",
            updatedCart: cart,
        };
    } catch (error) {
        return {
            success: false,
            message: `Error adding item to cart: ${error}`,
        };
    }
};
