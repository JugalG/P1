import { Product } from "../features/types/product";

export function sortProducts(sortBy: string, products: Product[]) {
    switch (sortBy) {
            case 'price-low-high':
                return [...products].sort((a, b) => a.price - b.price);
            case 'price-high-low':
                return [...products].sort((a, b) => b.price - a.price);
            case 'name-asc':
                return [...products].sort((a, b) => a.title.localeCompare(b.title));
            case 'name-desc':
                return [...products].sort((a, b) => b.title.localeCompare(a.title));
            case 'rating-high-low':
                return [...products].sort((a, b) => b.rating.rate - a.rating.rate);
            case 'rating-low-high':
                return [...products].sort((a, b) => a.rating.rate - b.rating.rate);
            default:
                return products;
        }
};
