'use client';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import '@/styles/global.css';
import ProductGrid from '@/components/product/productCard/productGrid';
import CartWrapper from '@/components/product/cart/CartWrapper';
import { useEffect, useReducer, useState } from 'react';
import LogoutButton from '@/components/common/logoutButton';
import { useRouter } from 'next/navigation';

export default function HomePage() {
    const router = useRouter();
    const [authed , setAuthed] =useState<boolean | null>(false);
    const [userObj,setUser] = useState<any>(null);
    useEffect(() => {
      const checkAuth = async () => {
        if(typeof window === 'undefined') return;
        const session = sessionStorage.getItem('userSession');
        if(!session){
          const cokkieClearLogoutRes = await fetch('/api/logout',{method:'POST'});
          const {status} = await cokkieClearLogoutRes.json();
          if(status===200){
            sessionStorage.clear();
          }
          router.push('/login');
          return;
        }
        try {
          if(session){
            const {user} =  JSON.parse(session);
            setUser(user);
            const res = await fetch('/api/session',{
            method:'GET',
            credentials:'include'
          });
           const {authenticated} = await res.json();
          if (res.ok && authenticated && session) {
            setAuthed(true);
          } else{
            setAuthed(false);
            const {status} =await fetch('/api/logout', { method: 'POST' }); 
            if(status === 200){
              sessionStorage.removeItem('userSession');
            }else throw new Error('Cookies could not be deleted');
            router.push('/login');
          }
        }
        } catch (err) {
          console.error('Auth check failed:', err);
          setAuthed(false);
          sessionStorage.clear();
          router.push('/login');
        }
    };
    checkAuth();
}, [router]);
  // if(authed===null) return <p>Check authentication</p>;


   return (
    (authed) && 
    <main className="govuk-main-wrapper">
      <Header  userObj={userObj}/>
      <div className=" govuk-width-container">
        <main className="govuk-main-wrapper">
          <div className="govuk-grid-row-cust govuk-grid-row">
            <div className="card-grid-section govuk-grid-column-two-thirds">
              <ProductGrid />
            </div>
            <div className="cart-section govuk-grid-column-one-third ">
              <CartWrapper/>
            </div>
          </div>
        </main>
      </div>
      <Footer />
      <div>

      </div>
     </main>
  );
  // return null;
}
