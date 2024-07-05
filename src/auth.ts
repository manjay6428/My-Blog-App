import NextAuth, { CredentialsSignin } from "next-auth"
import GoogleProvider from 'next-auth/providers/google'
import CredentialProvider from 'next-auth/providers/credentials'
import { User } from "./models/userModel";
import {compare} from 'bcryptjs'
import connectToDB from "./database/index";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID, 
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialProvider({
        name: "Credentials",
        credentials:{
            email: {
                label: "Email",
                type: "email"
            },
            password: {
                label: "Password",
                type: "password"
            }
        },
        authorize: async (credentials)=> {
          
            const email = credentials.email as string | undefined;
            const password = credentials.password as string | undefined;
            console.log("Hi",email,password);
            
            if(!email || !password) throw new CredentialsSignin("Please provide both email and password");

            //connect to DB 
            await connectToDB();
            const user = await User.findOne({email}).select("+password");
            if(!user) throw new CredentialsSignin("Invalid email or password ");
            if(!user.password) throw new CredentialsSignin("Invalid email or password ");

            const ismatch = await compare(password,user.password);
            if(!ismatch) throw new CredentialsSignin("Password does not match!");
            console.log("Match found");
            console.log(user.name,user.email);
            
            return {name: user.name , email: user.email , id: user._id};
        }
    })
  ],
  pages:{
    signIn: "/login"
  }
})