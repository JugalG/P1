import ProductQuickView from "./ProductQuickView";
import { Product } from "@/lib/features/types/product";

export default function ProductQuickViewModal({product,onClose}:{product:Product|null;onClose:()=>void }) {
    if(!product) return null;
    
    return <ProductQuickView product={product} onClose = {onClose} /> ;
}