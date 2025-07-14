'use client';
import { useEffect, useRef } from 'react';
import QuickViewModalCloseButton from './ProductQuickViewModalCloseButton';
import '@/styles/quick-view.css';
import Image from 'next/image';
import { SetStateAction } from 'react';
import { Product } from '@/lib/features/types/product';

export default function ProductQuickView({
  product,
  onClose,
}: {
  product: Product;
  onClose: (value: SetStateAction<boolean>) => void;
}) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    // Focus close button when modal opens
    closeBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose(false); // close modal on Escape
      }

      // Optional: Focus trap
      if (e.key === 'Tab' && modalRef.current) {
        const focusableEls = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstEl = focusableEls[0];
        const lastEl = focusableEls[focusableEls.length - 1];

        if (e.shiftKey) {
          // Shift+Tab
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!product) return null;

  return (
    <div className="quick-view-overlay" role="dialog" aria-modal="true" ref={modalRef}>
      <div className="quick-view-modal">
        <div className="quick-view-grid">
          <Image
            src={product.image}
            alt={product.title}
            width={200}
            height={250}
            className="card-image"
            style={{ objectFit: 'contain', width: 'auto', height: 'auto' }}
          />

          <hr />
          <div className="quick-view-info">
            <h4 className="govuk-heading-m-cust-quick-view">{product.title}</h4>
            <h3 className="govuk-heading-m-cust-quick-view">Price: €{product.price}</h3>
            <h3 className="govuk-heading-m-cust-quick-view">Category: {product.category}</h3>
            <p className="mmmm">Description: {product.description}</p>
            <h3 className="govuk-heading-m-cust-quick-view">Rating: {product.rating.rate}</h3>

            <QuickViewModalCloseButton
              onCloseAction={() => onClose(false)}
              buttonRef={closeBtnRef} // pass ref to focus
            />
          </div>
        </div>
      </div>
    </div>
  );
}




// import QuickViewModalCloseButton from './ProductQuickViewModalCloseButton';
// import '@/styles/quick-view.css';
// import Image from 'next/image';
// import { SetStateAction } from 'react';
// import { Product } from '@/lib/features/types/product';



// export default function ProductQuickView({product,onClose}:{product:Product, onClose:(value:SetStateAction<boolean>) => void}) {

//     return (
//         <>  {product &&
//             <div className='quick-view-overlay'>
//                 <div className='quick-view-modal'>
//                     <div className='quick-view-grid'>
//                         {/* <Image src={product.image} alt='Product Image' width='250' height='300' /> */}
//                         <Image src={product.image} alt={product.title} width={200} height={250} className="card-image" style={{objectFit: 'contain', width: 'auto', height:'auto'}} />
                        
//                         <hr/>
//                         <div className='quick-view-info'>
//                             <h4 className="govuk-heading-m-cust-quick-view">{product.title}</h4>
//                             <h3 className="govuk-heading-m-cust-quick-view">Price: €{product.price}</h3>
//                             <h3 className="govuk-heading-m-cust-quick-view">Category: {product.category} </h3>
//                             <p className="mmmm">Description: {product.description} </p>
//                             <h3 className="govuk-heading-m-cust-quick-view">Rating: {product.rating.rate} </h3>
//                             <QuickViewModalCloseButton onCloseAction = {() => onClose(false)}/>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             }
//         </>
//         )
        
// }