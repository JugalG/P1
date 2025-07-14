'use client';
import usePageRouter from '@/lib/features/utilities/router';
import { useEffect, useState } from 'react';

export default function Home() {
  // const router = usePageRouter();
    const [authChecked,setAuthChecked] = useState(false);
  const router = usePageRouter();
  

  useEffect(() => {
  const checkAuth = async () => {
    try {
      const res = await fetch('/api/session',{
        method:'GET',
        credentials:'include'
      });
      const session = sessionStorage.getItem('userSession');

      console.log('data authenticated:',res);
      if (res.ok && session) {
        router('/homepage');
      } else{
        await fetch('/api/logout', { method: 'POST' }); 
        sessionStorage.clear();
        router('/login');
      }
    } catch (err) {
      console.error('Auth check failed:', err);
    }
  };
  checkAuth();
}, []);



  // useEffect(() => {
  //   const checkSession = async () => {
  //     const session = sessionStorage.getItem('userSession');

  //     if (!session) {
  //       await fetch('/api/logout', { method: 'POST' }); 
  //       sessionStorage.clear();
  //       router('/login');
  //     } else {
  //       router('/homepage');
  //     }
  //   };

  //   checkSession();
  // }, [router]);

  return <p style={{display:'flex',justifyContent:'center',alignItems:'center', width:'100vw' ,height:'100%'}}>Redirecting...</p>;
}



// 'use client';
// import '@/styles/global.css';
// import Footer from '@/components/common/Footer';
// import Header from '@/components/common/Header';
// import { useRouter } from 'next/navigation';
// // import { useEffect, useState } from 'react';

// export default function Home() {
//   const router = useRouter();

//   const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const formData = new FormData(e.currentTarget);
//     const email = formData.get('email');
//     const password = formData.get('password');

//     try {
//       console.log(email, password);
//       const res = await fetch(`http://localhost:8000/users?email=${email}&password=${password}`);
//       const data = await res.json();

//       if (data.length > 0) {
//         console.log('Login Successful:', data[0]);
//         const user = data[0];
//         const sessionData = {
//           user,
//           loginTime: new Date().getTime(),
//         }

//         sessionStorage.setItem('userSession' , JSON.stringify(sessionData));
//         router.push('/homepage');
//       } else {
//         alert('Invalid email or password');
//       }
//     } catch (err) {
//       console.error(err);
//       alert('Error logging in. Please try again.');
//     }

//   };

//   return (
//     <main className="govuk-main-wrapper">
//       <Header />
//       <>
//         <div className="govuk-width-container">
//           <main className="govuk-main-wrapper govuk-!-padding-top-7">
//             <h1 className="govuk-heading-l">Login</h1>
//             <form onSubmit={handleLogin} className="login-form-container">
//               <div className="govuk-form-group">
//                 <label className="govuk-label" htmlFor="email">
//                   Email address
//                 </label>
//                 <input
//                   className="govuk-input login-input"
//                   id="email"
//                   name="email"
//                   type="email"
//                   required
//                 />
//               </div>

//               <div className="govuk-form-group">
//                 <label className="govuk-label" htmlFor="password">
//                   Password
//                 </label>
//                 <input
//                   className="govuk-input login-input"
//                   id="password"
//                   name="password"
//                   type="password"
//                   required
//                 />
//               </div>

//               <button type="submit" className="govuk-button">
//                 Login
//               </button>
//             </form>
//           </main>
//         </div>
//       </>
//       <Footer />
//     </main>
//   );
// }

// // export default function Home() {
// //   const [authChecked,setAuthChecked] = useState(false);
// //   const router = useRouter();
  

// // //   useEffect(() => {
// // //   const checkAuth = async () => {
// // //     try {
// // //       setLoading(false);
// // //       const res = await fetch('/api/session',{
// // //         method:'GET',
// // //         credentials:'include'
// // //       });
// // //       const data = await res.json();

// // //       if (res.ok && data.authenticated) {
// // //         router.push('/homepage');
// // //       } else {
// // //         setLoading(true);
// // //         console.log('Not authenticated. Redirecting...');
// // //       }
// // //     } catch (err) {
// // //       console.error('Auth check failed:', err);
// // //     }
// // //   };


// // //   checkAuth();
// // // }, []);


// //   const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
// //     e.preventDefault();

// //     const formData = new FormData(e.currentTarget);
// //     const email = formData.get('email');
// //     const password = formData.get('password');

//     // try {
//     //   console.log(email, password);
//     //   const res = await fetch(`http://localhost:8000/users?email=${email}&password=${password}`);
//     //   const data = await res.json();

//     //   if (data.length > 0) {
//     //     console.log('Login Successful:', data[0]);
//     //     const user = data[0];
//     //     const sessionData = {
//     //       user,
//     //       loginTime: new Date().getTime(),
//     //     }

//     //     sessionStorage.setItem('userSession' , JSON.stringify(sessionData));
//     //     router.push('/homepage');
//     //   } else {
//     //     alert('Invalid email or password');
//     //   }
//     // } catch (err) {
//     //   console.error(err);
//     //   alert('Error logging in. Please try again.');
//     // }

// //   };
// //   if(!authChecked){
// //     return <p>Checking Auth.....</p>;
// //   }

// //   return (
// //  <>
// //     <main className="govuk-main-wrapper">
// //       <Header />
// //         <div className="govuk-width-container">
// //           <main className="govuk-main-wrapper govuk-!-padding-top-7">
// //             <h1 className="govuk-heading-l">Login</h1>
// //             <form onSubmit={handleLogin} className="login-form-container">
// //               <div className="govuk-form-group">
// //                 <label className="govuk-label" htmlFor="email">
// //                   Email address
// //                 </label>
// //                 <input
// //                   className="govuk-input login-input"
// //                   id="email"
// //                   name="email"
// //                   type="email"
// //                   required
// //                 />
// //               </div>

// //               <div className="govuk-form-group">
// //                 <label className="govuk-label" htmlFor="password">
// //                   Password
// //                 </label>
// //                 <input
// //                   className="govuk-input login-input"
// //                   id="password"
// //                   name="password"
// //                   type="password"
// //                   required
// //                 />
// //               </div>

// //               <button type="submit" className="govuk-button">
// //                 Login
// //               </button>
// //             </form>
// //           </main>
// //         </div>
// //       <Footer />
// //     </main>
// //       </>);
// // }
