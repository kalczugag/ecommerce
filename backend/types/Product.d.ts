export interface ProductProps {
    _id?: string;
    imageUrl: string;
    brand: string;
    title: string;
    color: string;
    discountedPrice?: number;
    price: number;
    discountPercent?: number;
    size: {
        name: string;
        quantity: number;
    }[];
    quantity: number;
    topLevelCategory: string;
    secondLevelCategory: string;
    thirdLevelCategory: string;
    description?: string;
}
