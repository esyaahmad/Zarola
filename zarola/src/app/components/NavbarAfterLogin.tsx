"use server";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function NavbarAfterLogin() {
  const handleFormLogout = async () => {
    "use server";
    cookies().get("token") && cookies().delete("token");
    redirect("/login");
  };
  const token = cookies().get('token')
  return (
    <>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        <Link href={"/"}>
          <span className="self-center text-3xl whitespace-nowrap dark:text-black font-light tracking-[.3em] mr-8	">ZAROLA</span>
        </Link>

        {/* searchbar */}
        <div className="flex flex-col m-h-screen w-6/12 ">
          <div className="bg-white items-center justify-between w-full flex rounded-full">
            <input className="uppercase rounded-full w-full py-4 pl-4 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline lg:text-sm text-xs" type="text" placeholder="Search" />
            <div className="bg-gray-600 p-2 hover:bg-blue-400 cursor-pointer mx-2 rounded-full">
              <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        {/* button */}
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8  md:mt-0 items-center">
            <li>
              <button className="block py-2 px-3 text-white  md:border-0 md:hover:underline md:p-0">
                <img src="person-black.png" className="size-6 " alt="" />
              </button>
            </li>
            <li>
              <Link href={'/wishlist'}>
              <button className="block py-2 px-3 text-white  md:border-0 md:hover:underline md:p-0">
                <img src="love-black.png" className="size-6" alt="" />
              </button>
              </Link>
            </li>
            <li>
              {token ? 
              <form className="text-center" action={handleFormLogout}>
                <button type="submit" className="border hover:bg-gray-50 text-black font-light py-2 px-4 rounded-full">
                  Logout
                </button>
              </form>
              : 
              <Link href={'/login'}>
              <button className="border hover:bg-gray-50 text-black font-light py-2 px-4 rounded-full">
                  Login
                </button>
                </Link>}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
