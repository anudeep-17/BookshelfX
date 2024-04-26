import { NextResponse } from "next/server";
import { database } from "../../prismaConfig";
import bcrypt from 'bcrypt';

export async function POST(req: Request) 
{
    try{
        const {email, password, name, role} = await req.json();
        const existingUserByEmail = await database.user.findUnique({
            where: {email: email}
        });
    
        if(existingUserByEmail){
            return NextResponse.json({user: null, essage: "User already exists"}, {status: 409});
        }
        const saltRounds = 10;
        const hashedpassword = await bcrypt.hash(password, saltRounds);
    
        const newuser = await database.user.create({
            data: {
               email,
               password: hashedpassword,
               name,
               role
            }
        });
        const {password:newUserPassword, ...user} = newuser;

        return NextResponse.json({message:"User created successfully", user:user}, {status: 200});
    }
    catch(e){
        return NextResponse.json({message: "An error occured"}, {status: 500});
    }
}