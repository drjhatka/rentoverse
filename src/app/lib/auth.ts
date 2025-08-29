import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
//import Google from "next-auth/providers/google";

export const {handlers, signIn, signOut, auth} =  NextAuth({
    providers:[
        Google({
           clientId:process.env.NEXT_OAUTH_CLIENT_ID,
           clientSecret:process.env.NEXT_OAUTH_CLIENT_SECRET 
        }),
        GitHub
    ]
})