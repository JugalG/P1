'use client';
import { getSessionUser } from "@/lib/features/utilities/session";
import LogoutButton from "./logoutButton";
import Link from "next/link";
import { useEffect, useState } from "react";
import { userType } from "@/lib/features/types/product";


export default function Header(userObject :{userObj: userType | null}) {
    const [user ,setUser] = useState<userType | null>(null);
    useEffect(
      ()=>{
        const session = userObject.userObj;
        setUser(session || null);
      }
      ,[]);
    return(
    <header className="p-6 govuk-header" data-module="govuk-header" data-govuk-header-init="">
      <div className="  w-[100%] pl-[10%] pr-[10%] flex flex-row justify-center items-center">
        <div className="w-[100%] govuk-header__logo-!-padding-0 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-evenly">
          <div className="flex items-center">
            <Link href="/" className="govuk-header__link govuk-header__link--homepage">
              <h1 className=' flex flex-column items-center justify-center '>ZODIAC.co</h1>
            </Link>
          </div>
          <div>
            {(user) && <p className="text-left">Welcome, {user.name}</p>}
          </div>
          <div className="flex items-center! ">
            {(user) && <LogoutButton/>}
          </div>
        </div>

      </div>
</header>
    );
}
