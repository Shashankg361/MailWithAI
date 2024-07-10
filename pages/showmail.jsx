import { useSession } from "next-auth/react"
import { useState } from "react";

export default function ShowMail(){
    const {data} = useSession();
    const [accesstoken, setAccessToken] = useState(data.accessToken);
    console.log("session-> ",data.accessToken)

    return<>
        <div className="p-2">
            <h1>Hello you are on the new page after redirection and access token is {accesstoken}</h1>
        </div>
    </>
}