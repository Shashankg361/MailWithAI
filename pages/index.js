import { Inter } from "next/font/google";
import {signIn , signOut , useSession} from "next-auth/react";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const {data,status} = useSession();
  console.log(data?.user, status);
  console.log("Seesion--> ",data);

  
  //console.log(process.env.NEXTAUTH_GOOGLE_ID);
  return (
    <main
      className={`flex min-h-screen flex-col   p-2 ${inter.className}`}
    >
      <div className="p-2 m-[-8px] mb-2 bg-stone-500 text-2xl">
        {data && 
          <div className="flex justify-between items-center">
            <h1>{data.user.name}</h1>
            <h1>{data.user.email}</h1>
            <img src={data.user.image} width={50} height={50} className="rounded-full"></img>
          </div>
        }
      </div>
      <button onClick={()=>signIn('google')}>
        <div className="flex items-center cursor-pointer">
          <h1 className="text-2xl text-slate-600">login with google</h1>
          <img src="./google.png" width={65} height={65}></img>
        </div>
      </button>
      
      <h1>OR</h1>
      <div className="flex items-center cursor-pointer ">
        <h1 className="text-2xl text-slate-600">login with outlook</h1>
        <img src="./outlook.png" width={65} height={65}></img>
      </div>
      
    </main>
  );
}
