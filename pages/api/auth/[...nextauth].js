import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { redirect } from "next/dist/server/api-utils";

export const authOptions = {
    providers:[
        GoogleProvider({
            clientId:process.env.NEXTAUTH_GOOGLE_ID,
            clientSecret:process.env.NEXTAUTH_GOOGLE_SECRET,
            authorization:{
                params:{
                    scope: 'openid profile email https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send'
                },
            },
        }),
    ],
    callbacks:{
        async jwt({token, account, user}){
            if(account && user){
                token.accessToken = account.access_token;
                token.refershToken = account.refersh_token;
                token.idToken = account.id_token;
                token.user = user;
            }
            // console.log("it's a account",account);
            // console.log("I'm user",user);
            // console.log("it's token", token);
            return token;
        },
        async session({ session, token}){
            session.accessToken = token.accessToken;
            session.refershToken = token.refershToken;
            session.idToken = token.idToken;
            session.user = token.user;
            //console.log("it's a session",session);
            return session;
        },
        async redirect({}){
            return `http://localhost:3000`+'/showmail';
        },
        secret : process.env.NEXTAUTH_SECRET,
    },
    session:{
        jwt:true,
        strategy:'jwt'
    }
}

export default NextAuth(authOptions);