import { BaseItemModel } from "../../../../models/BaseItem";
import type { Item } from "../../../../types/Order";
import type { CartDocument } from "../../../../types/Cart";
import type { HandleAddResult } from "../update";

export const handleClear = async (
    cart: CartDocument
): Promise<HandleAddResult> => {
    try {
        const itemsId = (cart.items as Item[]).map((item) => item._id);
        if (itemsId.length > 0) {
            await BaseItemModel.deleteMany(itemsId);
        }

        cart.items = [];
        cart.subTotal = 0;
        cart.discount = 0;
        cart.promoCodeDiscount = 0;
        cart.deliveryCost = 0;
        cart.total = 0;

        await cart.save();

        return {
            success: true,
            message: "Cart cleared successfully",
            updatedCart: cart,
        };
    } catch (error) {
        return {
            success: false,
            message: `Error clearing cart: ${error}`,
        };
    }
};
