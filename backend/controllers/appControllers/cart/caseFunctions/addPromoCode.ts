import { FeaturedCampaignModel } from "../../../../models/FeaturedCampaign";
import type { CartDocument } from "../../../../types/Cart";
import type { HandleAddResult } from "../update";

export const handleAddPromoCode = async (
    cart: CartDocument,
    promoCode: string
): Promise<HandleAddResult> => {
    if (cart.discount > 0)
        return {
            success: false,
            message: "Discount already applied",
        };

    if (!promoCode)
        return {
            success: false,
            message: "Promo code is required",
        };

    try {
        const campaign = await FeaturedCampaignModel.findOne({
            promoCode,
        });

        if (!campaign)
            return {
                success: false,
                message: "Promo code not found",
            };

        const now = new Date();
        const isActive =
            new Date(campaign.startDate) <= now &&
            now <= new Date(campaign.endDate);

        if (!isActive || campaign.status === "inactive")
            return {
                success: false,
                message: "Promo code is not active",
            };

        cart.discount = (cart.subTotal * campaign.discount) / 100;
        cart.total = cart.subTotal - cart.discount;

        await cart.save();

        return {
            success: true,
            message: "Cart updated successfully",
            updatedCart: cart,
        };
    } catch (error) {
        return {
            success: false,
            message: `Error updating cart: ${error}`,
        };
    }
};
