import QuickViewModalCloseButton from './ProductQuickViewModalCloseButton';
import '@/styles/quick-view.css';
import Image from 'next/image';
import { SetStateAction } from 'react';
import { Product } from '@/lib/features/types/product';



export default function ProductQuickView({product,onClose}:{product:Product, onClose:(value:SetStateAction<boolean>) => void}) {

    return (
        <>  {product &&
            <div className='quick-view-overlay'>
                <div className='quick-view-modal'>
                    <div className='quick-view-grid'>
                        {/* <Image src={product.image} alt='Product Image' width='250' height='300' /> */}
                        <Image src={product.image} alt={product.title} width={200} height={250} className="card-image" style={{objectFit: 'contain', width: 'auto', height:'auto'}} />
                        
                        <hr/>
                        <div className='quick-view-info'>
                            <h4 className="govuk-heading-m-cust-quick-view">{product.title}</h4>
                            <h3 className="govuk-heading-m-cust-quick-view">Price: €{product.price}</h3>
                            <h3 className="govuk-heading-m-cust-quick-view">Category: {product.category} </h3>
                            <p className="mmmm">Description: {product.description} </p>
                            <h3 className="govuk-heading-m-cust-quick-view">Rating: {product.rating.rate} </h3>
                            <QuickViewModalCloseButton onCloseAction = {() => onClose(false)}/>
                        </div>
                    </div>
                </div>
            </div>
            }
        </>
        )
        
}