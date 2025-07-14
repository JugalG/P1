'use client';
import '@/styles/global.css';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { loginUser } from '@/lib/api/api';
import { getSessionUser } from '@/lib/features/utilities/session';
import usePageRouter from '@/lib/features/utilities/router';
type userType={
email:string;
id:string;
name:string;
username:string;

}

export default  function Login() {
  
  const router = useRouter();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = sessionStorage.getItem('userSession');
        if(session){const res = await fetch('/api/session',{
          method:'GET',
          credentials:'include'
        });
        if (res.ok) {
          router.push('/homepage');
        } else{
          await fetch('/api/logout', { method: 'POST' }); 
          sessionStorage.clear();
        }
      }
      } catch (err) {
        console.error('Auth check failed:', err);
      }
    };
    checkAuth();
}, []);


    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const email = formData.get('email')?.toString();
      const password = formData.get('password')?.toString();

      try {
        if(email && password){
            const res = await fetch('/api/login', {
              method: 'POST',
              body: JSON.stringify({ email, password }),
              headers: {
                'Content-Type': 'application/json',
              },
              credentials:'include',
            });

            
            if (res.ok) {
              
              const data =await  res.json();
              // console.log('Login Successful:', data);
              const {id,name,username,email} = data;
              const user = {id:id,name:name,username:username,email:email};            
              const sessionData :{user:userType,loginTime:number} = {
                user,
                loginTime: new Date().getTime(),
              }
              sessionStorage.setItem('userSession' , JSON.stringify(sessionData));
              console.log("resLogin :",sessionData);
              router.push('/homepage');
          } else {
              alert('Invalid email or password');
          }
      }
      } catch (err) {
        console.error(err);
        alert('Error logging in. Please try again.');
      }
    };

  return (
    <main className="govuk-main-wrapper">
      <Header />
      <>
        <div className="govuk-width-container">
          <main className="govuk-main-wrapper govuk-!-padding-top-7">
            <h1 className="govuk-heading-l">Login</h1>
            <form onSubmit={handleLogin} className="login-form-container">
              <div className="govuk-form-group">
                <label className="govuk-label" htmlFor="email">
                  Email address
                </label>
                <input
                  className="govuk-input login-input"
                  id="email"
                  name="email"
                  type="email"
                  required
                />
              </div>

              <div className="govuk-form-group">
                <label className="govuk-label" htmlFor="password">
                  Password
                </label>
                <input
                  className="govuk-input login-input"
                  id="password"
                  name="password"
                  type="password"
                  required
                />
              </div>

              <button type="submit" className="govuk-button">
                Login
              </button>
            </form>
          </main>
        </div>
      </>
      <Footer />
    </main>
  );
}


    // const handleLogout = async ()=>{
    //   if((sessionStorage.getItem('userSession')!==null )){
    //         console.log('Handle Logout Called');
    //         sessionStorage.clear();
            
    //         const logoutApi = await  fetch('/api/logout',{
    //             method:'POST'
    //         })
    //         // router.push('/login');
    //     }
    // }
    // handleLogout();