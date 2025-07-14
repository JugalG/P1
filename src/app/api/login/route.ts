
import { loginUser } from "@/lib/api/api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  const res = await loginUser(email, password);

  if (!res) {
    return new Response(JSON.stringify({ error: "Invalid credentials" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { id, name, username, email: email1 } = res;
  const user = { id, name, username, email: email1 };

  const response = NextResponse.json(user, {
    status: 200
  });

  response.cookies.set("auth-token", `${user.id}`, {
    httpOnly: true,
    maxAge: 10 * 60*1000, 
    path: "/",
    sameSite: "lax",
  });

  return response;
}
















// import { loginUser } from "@/lib/api/api";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(request: NextRequest) {
//   const body = await request.json();
//   const { email, password } = body;

//   const res = await loginUser(email, password);
//   if (!res) {
//     return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
//   }

//     console.log("Login Successful:", res);
//     const { id, name, username, email:email1 } = res;
//     const user = { id: id, name: name, username: username, email: email1 };
  


//   const response = NextResponse.json(user);

//   response.cookies.set("auth-token", `${user.id}`, {
//     httpOnly: true,
//     maxAge: 10 * 60 * 1000,
//     path: "/",
//     sameSite: "lax",
//   });

//   return response;
// }
