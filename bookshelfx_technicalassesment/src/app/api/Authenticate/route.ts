import { NextResponse } from "next/server";
import { database } from "../prismaConfig";
import { NextApiRequest } from "next";
import bcrypt from 'bcrypt';

export async function POST(req:Request) {
    try{
        const { email, password } = await req.json();
        console.log(email, password)
        const user = await database.user.findUnique({
            where: {
                email
            }
        })
        console.log(user)
        if (!user) {
            return NextResponse.json({ message: "Invalid email or password" }, {status: 401});
        }

        if(!await bcrypt.compare(password, user.password))
        {
            return NextResponse.json({ message: "Invalid email or password" }, {status: 401});
        }
    
        return NextResponse.json({ message: "Login successful" }, {status: 200});
    }
    catch(e){
        return NextResponse.json({message: "An error occured"}, {status: 500});
    }
}