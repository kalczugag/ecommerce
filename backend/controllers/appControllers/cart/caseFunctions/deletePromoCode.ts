import type { CartDocument } from "../../../../types/Cart";
import type { HandleAddResult } from "../update";

export const handleDeletePromoCode = async (
    cart: CartDocument
): Promise<HandleAddResult> => {
    if (!cart.promoCode)
        return {
            success: false,
            message: "No promo code applied to remove",
        };

    try {
        cart.promoCode = null;
        cart.promoCodePercent = 0;

        await cart.save();

        return {
            success: true,
            message: "Promo code removed successfully",
            updatedCart: cart,
        };
    } catch (error) {
        return {
            success: false,
            message: `Error removing promo code: ${error}`,
        };
    }
};
