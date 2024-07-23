import axios from "axios";
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";

export default function ShowMail(){
    const {data: session, status} = useSession();
    const [accesstoken, setAccessToken] = useState();
    const [resp,setResp] = useState();
    session && console.log("session-> ",session);
    session && console.log("accessToken",session?.accessToken);
    const [count , setCount] = useState(0);
    useEffect(()=>{
        setAccessToken(session?.user);
        setCount(count+1);
        session && getMail();
    },[session]); 
    

    async function getMail(){
        const response = await axios.post('./api/getMail',{access_token:session?.accessToken});
        const data = response.data;
        setResp(data.message);
        console.log("Message",data?.Message);
    }

    return<>
        <div className="p-2">
            <h1>Hello you are on the new page after redirection and access token is </h1>
            <h1>{count}</h1>
            <div dangerouslySetInnerHTML={{__html: resp?.body}}>
                
            </div>
        </div>
    </>
}