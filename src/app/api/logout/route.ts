import {  NextResponse } from "next/server";
import { cookies } from 'next/headers';

// export async function GET(request:NextRequest) {
//     const url = new URL('/login',request.url);
//     const response =  NextResponse.redirect(url);
//      response.cookies.delete('auth-token');
//      sessionStorage.clear();
//     return response;
// }


export async function POST() {
  (await cookies()).delete('auth-token');
  return NextResponse.json({ message: "Logged out" , status:200});
}


// export function GET(){

//   return NextResponse.redirect(new URL('/login','http://localhost:3000'));
// }