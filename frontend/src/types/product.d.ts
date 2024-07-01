export interface Product {
    imageUrl: string;
    brand: string;
    title: string;
    color: string;
    discountedPrice?: number;
    price: number;
    discountPersent?: number;
    size: {
        name: string;
        quantity: number;
    }[];
    quantity: number;
    topLavelCategory: string;
    secondLavelCategory: string;
    thirdLavelCategory: string;
    description?: string;
}
