import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import {PrismaAdapter} from "@next-auth/prisma-adapter"
import { database } from "@/app/api/prismaConfig";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(database),
    pages:{
        signIn: '/',
       
    },
    session: {
        strategy: 'jwt',

    },
    providers: [
        CredentialsProvider({
          name: 'Credentials',
          credentials: {
            email: { label: "Email", type: "text", placeholder: "jhondoe@gmail.com"},
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {
            if(!credentials?.email || !credentials?.password)
            {
                return null;
            }
            const res = await fetch("/api/user/authenticate", {
              method: 'POST',
              body: JSON.stringify(credentials),
              headers: { "Content-Type": "application/json" }
            })
            const user = await res.json()
            if(user.success)
            {
                return user.user
            }
            return null
          }
        })
      ]
}