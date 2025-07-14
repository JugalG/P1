import Image from "next/image";
import "@/styles/summary-card.css";
import type { Product } from "@/lib/features/types/product";
import ProductSummaryCardButtons from "./ProductSummaryCardButtons.tsx";

type psc ={
    product: Product;
    onQuickView: ()=>void;
};


export default function ProductSummaryCard( {product,onQuickView} :psc ) {

    return (
        <>
            <div className="summary-card">
                <div className="card">
                    <div className="image-wrapper-cust">
                        <Image src={product.image} alt={product.title} fill sizes="(max-width:786px) 100vw, 200px" className="card-image" style={{ objectFit: 'contain'}} priority />
                        {/* <Image src={product.image} alt="title" width={200} height={250} className="card-image" style={{ objectFit: 'contain', width:"auto", height:"auto" }} /> */}
                    </div>
                    <h4 className="govuk-heading-m-cust-summary">{product.title}</h4>
                    <h3 className="govuk-heading-m-cust-summary">Price: €{product.price}</h3>
                    <ProductSummaryCardButtons product={product} onQuickView={onQuickView}/>
                </div>
            </div>
        </>
    );
}