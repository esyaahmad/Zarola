import Link from "next/link";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getUserByEmail } from "../db/models/user";
import { compare } from "../db/utils/toBcrypt";
import {signToken} from "@/lib/jwt";
import { cookies } from "next/headers";
import ClientFlashComponent from "../components/ClientFlashComponent";
import Navbar from "../components/Navbar";
  
export default function Login() {
  const handleFormAction = async (formData: FormData) => {
    "use server";

    const loginInputSchema = z.object({
      email: z.string().email(),
      password: z.string(),
    });

    const email = formData.get("email");
    const password = formData.get("password");

    const parsedData = loginInputSchema.safeParse({
      email,
      password,
    });

    if (!parsedData.success) {
      const errPath = parsedData.error.issues[0].path[0];
      const errMessage = parsedData.error.issues[0].message;
      const errFinalMessage = `${errPath} - ${errMessage}`;

      return redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/login?error=${errFinalMessage}`);
    }

    // Memvalidasi data terhadap database
    const user = await getUserByEmail(parsedData.data.email);

    if (!user || !compare(parsedData.data.password, user.password)) {
      return redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/login?error=Invalid%20Username%20Password`);
    }

    const payload = {
      id: user._id,
      email: user.email,
    };

    const token = signToken(payload);

    cookies().set("token", token, {
      httpOnly: true,
      secure: false,
      expires: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
      sameSite: "strict",
    });

    return redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/`);
  };
  return (
    <>
      <div>
        <nav className="bg-black">
          <Navbar />
        </nav>
      </div>

      <div className="relative w-full h-full bg-gray-50 py-8">
        <div className="absolute top-0 w-full h-full "></div>
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-4/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg  bg-white border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="flex justify-around border-b border-black	">
                    {/* form input */}
                    <button className="border-b-2 px-4 border-black	">Login</button>
                    <Link href={"/register"}>
                      <button className="px-4">Register</button>
                    </Link>
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
