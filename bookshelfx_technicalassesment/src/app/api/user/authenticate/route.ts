import { NextResponse } from "next/server";
import { database } from "../../prismaConfig";
import { NextApiRequest } from "next";
import bcrypt from 'bcrypt';

export async function POST(req:Request) {
    try{
        const { email, password } = await req.json();
        
        if(!email || !password){
            return NextResponse.json({ success: false, message: "Email and password are required"}, {status: 400});
        }

        const user = await database.user.findUnique({
            where: {
                email
            }
        })
        
        if (!user) {
            return NextResponse.json({ success: false, message: "User doesn't exist" }, {status: 401});
        }

        if(!await bcrypt.compare(password, user.password))
        {
            return NextResponse.json({ success: false, message: "Invalid email or password" }, {status: 401});
        }
        
        const {password:HashedPassword, ...userData} = user;
        return NextResponse.json({success: true, message: "Login successful", user:userData}, {status: 200});
    }
    catch(e){
        return NextResponse.json({ success: false, message: "An error occured"}, {status: 500});
    }
}