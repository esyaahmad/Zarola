import Link from "next/link";
import ClientFlashComponent from "../components/ClientFlashComponent";
import { MyResponse } from "../api/products/route";
import { redirect } from "next/navigation";
import Navbar from "../components/Navbar";

export default function Register() {
  const handleFormAction = async (formData: FormData) => {
    "use server";

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`, {
      method: "POST",
      body: JSON.stringify({
        username: formData.get("username"),
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseJson: MyResponse<unknown> = await response.json();

    if (!response.ok) {
      let message = responseJson.error ?? "Something went wrong! Contact Our Admin";

      return redirect(`/register?error=${message}`);
    }

    return redirect("/login");
  };

  return (
    <>
      <nav className="bg-black">
        <Navbar />
      </nav>

      <div className="relative w-full h-full bg-gray-50 py-8">
        <div className="absolute top-0 w-full h-full "></div>
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-4/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg  bg-white border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="flex justify-around border-b border-black	">
                    <Link href={"/login"}>
                      <button className=" px-4 	">Login</button>
                    </Link>
                    <button className="px-4 border-b-2 border-black">Register</button>
                  </div>
                  <ClientFlashComponent />

                  <div className="text-center mb-3">
                    <h6 className="text-black text-2xl font-light tracking-widest mt-12">Masuk ke akun Anda</h6>
                  </div>
                  <div className="btn-wrapper text-center">
                    <button
                      className="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                      type="button"
                    >
                      <img alt="..." className="w-5 mr-1" src="google-logo.png" />
                      Google
                    </button>
                  </div>
                  <div className="text-center mb-3">
                    <h6 className="text-black text-xs font-light tracking-widest mx-8 my-8">Kami tidak akan posting atas nama Anda atau membagikan informasi apapun tanpa persetujuan Anda.</h6>
                  </div>
                  <hr className="mt-6 border-b-1 border-gray-400" />
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <form action={handleFormAction}>
                    <div className="relative w-full mb-9">
                      <label className="block text-gray-700 text-xs font-bold mb-2">Alamat Email</label>
                      <input type="email" name="email" className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" placeholder="Email" />
                    </div>
                    <div className="relative w-full mb-9">
                      <label className="block text-gray-700 text-xs font-bold mb-2">Username</label>
                      <input type="text" name="username" className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" placeholder="Username" />
                    </div>
                    <div className="relative w-full mb-9">
                      <label className="block text-gray-700 text-xs font-bold mb-2">Name</label>
                      <input type="text" name="name" className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" placeholder="Name" />
                    </div>
                    <div className="relative w-full mb-9">
                      <label className="block text-gray-700 text-xs font-bold mb-2">Password</label>
                      <input type="password" name="password" className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" placeholder="Password" />
                    </div>

                    <div className="text-center mt-6">
                      <button className="bg-gray-900 text-white active:bg-gray-700 text-sm uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full" type="submit">
                        Masuk
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
