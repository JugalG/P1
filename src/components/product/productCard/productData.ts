
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {fetchProductsStart,fetchProductsSuccess,fetchProductsFailure} from '@/lib/features/product/productSlice';
import { RootState } from '@/lib/features/store/store';
import { Product } from '@/lib/features/types/product';

export default function useProductData() {
  const dispatch = useDispatch()
  const { products, loading, error } = useSelector((state: RootState) => state.data)
  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchProductsStart())
      try {
        const res = await fetch('/api/products');

        if (!res.ok) throw new Error('Failed to fetch products from API SERVER');
        const data : Product[] = await res.json()

        // const cleaned: Product[] = data.map((p: Product) => ({
        //   id: p.id,
        //   title: p.title,
        //   price: p.price,
        //   image: p.image,
        //   category: p.category,
        //   description: p.description,
        //   quantity: 0,
        //   rating: {
        //     rate: p.rating.rate,
        //     count: p.rating.count
        //   }
        // }))

        dispatch(fetchProductsSuccess(data))
      } catch (err: any) {
        dispatch(fetchProductsFailure(err.message))
      }
    }

    fetchData()
  }, [dispatch]);


  return { products, loading, error } ;
}