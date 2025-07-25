import { NextRequest, NextResponse } from "next/server";

export async function GET(request : NextRequest) {
  const sessionCookie =  request.cookies.get('auth-token')?.value;
  if (!sessionCookie) {
      return NextResponse.json({ authenticated:false,message: "Not authenticated" }, { status: 400 });
  }
  try {   
    console.log('session validated ');
    return NextResponse.json({authenticated:true, status: 200 });
  }catch (err) {
    console.log('session Invalid error');
    return NextResponse.json({authenticated:false, message: "Invalid session" }, { status: 400 });
  }
} 