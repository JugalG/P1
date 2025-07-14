import { getSessionUser } from "@/lib/features/utilities/session";
import LogoutButton from "./logoutButton";

// export default function Header({children}:any) {
//   return (
//     <header className="govuk-header" data-module="govuk-header">
//       <div className="govuk-header__container govuk-width-container">
//         <div className="header">
//           <h1>Zodiac</h1>
//           {/* <Image src='/cloth-header.jpg'
//                       width={500}
//                       height={100}
//                       alt="Picture of the author"
//                     /> */}
//         {children}
//         </div>
//       </div>
//     </header>
//   );
// }

export default function Header() {
    const user = getSessionUser();
    return(
        <header className="govuk-header" data-module="govuk-header">
                <div className="govuk-header__container govuk-width-container">
                  <div className="header">
                    {(user) && <p>Hii,{user.name}</p>}
                    <h1>ZODIAC.co</h1>
                    <div>
                      {/* {(user) && <p>{user.email}</p>} */}
                      {user && <LogoutButton/>}
                    </div>
                  </div>
                </div>
              </header>
    );
}