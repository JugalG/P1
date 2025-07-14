import { NextResponse } from "next/server";
import path from "path";
import fs from 'fs/promises';
import { Product } from "@/lib/features/types/product";
import { PathLike } from "fs";

const CACHE_PATH = path.join(process.cwd(),'cache','products.json');
console.log(CACHE_PATH);
const CACHE_EXPIRY_MS = 1000*60*60 ; 
export async function GET() {
    try{
      const fileData = await fs.readFile(CACHE_PATH,'utf-8');
      const parsed = JSON.parse(fileData);
      const isExpired = Date.now() - parsed.timestamp > CACHE_EXPIRY_MS
      if(Array.isArray(parsed.data) && parsed.data.length >0){
        if(isExpired){
            await fetchAndCacheExternalProducts();
        }
        return NextResponse.json(parsed.data);
      }else {
        const freshData = await fetchAndCacheExternalProducts();
        return NextResponse.json(freshData);
      }
    }catch(e){
        const freshData = await fetchAndCacheExternalProducts();
        return NextResponse.json(freshData);
    }
}

async function fetchAndCacheExternalProducts() {   
  try {
    const res = await fetch('https://fakestoreapi.com/products');
    if (!res.ok) throw new Error('Failed to fetch products')
    const data = await res.json();
    const cleaned: Product[] = data.map((p: Product) => ({
      id: p.id,
      title: p.title,
      price: p.price,
      image: p.image,
      category: p.category,
      description: p.description,
      quantity: 0,
      rating: {
        rate: p.rating.rate,
        count: p.rating.count
      }
    }));
    // console.log(cleaned);
    const toStore = {timestamp:Date.now(), data:cleaned};

    const dir1 = path.dirname(CACHE_PATH);
    
    await fs.mkdir(dir1,{recursive:true});
    await fs.writeFile(CACHE_PATH,JSON.stringify(toStore,null,2));
    return cleaned;
  }catch (err: any) {
    console.error('Error chacing or fetching the products; Please check network connectivity.');
    return [];
  }
}
        
    
