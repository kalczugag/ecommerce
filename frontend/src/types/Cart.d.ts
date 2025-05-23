import type { Sizes } from "@/modules/ProductsModule/ReadProductDetailsModule";
import type { Product } from "./Product";
import type { Item } from "./Order";
import type { User } from "./User";

export interface Cart {
    _id?: string;
    _user: string | User;
    items: Item[];
    subTotal: number;
    discount: number;
    promoCodePercent: number;
    promoCode: string | null;
    deliveryCost: number;
    total: number;
}
