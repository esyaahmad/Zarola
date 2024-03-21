import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <div className="max-w-screen-xl flex flex-wrap items-center mx-auto p-2">
        <Link href={"/"}>
          <button className="self-center text-3xl whitespace-nowrap dark:text-white font-light tracking-[.3em] mr-8">ZAROLA</button>
        </Link>

        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8  md:mt-0 font-medium">
            <li>
              <p className="block py-2 px-3 text-white  md:border-0 md:hover:underline md:p-0  ">Fast</p>
            </li>
            <li>
              <p className="block py-2 px-3 text-white  md:border-0 md:hover:underline md:p-0  ">Sale</p>
            </li>
            <li>
              <p className="block py-2 px-3 text-white  md:border-0 md:hover:underline md:p-0 ">Original</p>
            </li>
            <li>
              <p className="block py-2 px-3 text-white  md:border-0 md:hover:underline md:p-0 ">Free Shipping</p>
            </li>
            <li>
              <p className="block py-2 px-3 text-white  md:border-0 md:hover:underline md:p-0 ">Top</p>
            </li>
            <li>
              <button className="block py-2 px-3 text-white  md:border-0 md:hover:underline md:p-0">
                <img src="person-logo.png" className="size-6 ml-[500px]" alt="" />
              </button>
            </li>
            <li>
              <button className="block py-2 px-3 text-white  md:border-0 md:hover:underline md:p-0">
                <img src="love-logo.png" className="size-6" alt="" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
