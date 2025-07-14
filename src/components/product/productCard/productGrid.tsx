"use client";
import { Product } from "@/lib/features/types/product.ts";
import useProductData from "./productData.ts";
import ProductSummaryCard from "./productSummaryCard/ProcductSummaryCard.tsx";
import SortDropdown from "./sortDropdown.tsx";
import { sortProducts } from "@/lib/helper/helper.ts";
import { useState } from "react";
import ProductQuickViewModal from "./productQuickView/ProductQuickViewModal.tsx";

export default function ProductGrid() {
    const [quickViewProduct,setQuickViewProduct] = useState<Product | null>(null);
    const { products, loading, error } = useProductData();
    const [sortBy, setSortBy] = useState<string>('default');
    const [currentPage, setCurrentPage] = useState<number>(1);
 
    if (loading) return <p>Loading products...</p>
    if (error) return <p>Error loading products: {error}</p>
    
    const itemsPerPage = 6;

    const sortedProducts = sortProducts(sortBy, products);
    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
    const paginatedProducts = sortedProducts.slice((currentPage - 1) * itemsPerPage,currentPage * itemsPerPage);
    return (
        <>
            <SortDropdown setSortBy={setSortBy} sortBy={sortBy} setPage = {() => setCurrentPage(1)}/>
            <div className="card-grid">
                {/* {sortProducts(sortBy, products).map((product) => (
                    <ProductSummaryCard key={product.id} product={product} onQuickView = {()=> setQuickViewProduct(product)}/>
                ))} */}
                {paginatedProducts.map((product) => (
                    <ProductSummaryCard
                        key={product.id}
                        product={product}
                        onQuickView={() => setQuickViewProduct(product)}
                    />
                    ))
                }
            </div>
            <div className="pagination-controls">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`govuk-button ${page === currentPage ? "govuk-button--secondary" : ""}`}
                >
                    {page}
                </button>
                ))}
            </div>
            <ProductQuickViewModal product={quickViewProduct} onClose={()=>setQuickViewProduct(null)}/>
        </>
    );
}
