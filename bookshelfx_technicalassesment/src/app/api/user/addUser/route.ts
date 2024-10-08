import { NextResponse } from "next/server";
import { database } from "../../prismaConfig";
import bcrypt from 'bcrypt';

export async function POST(req: Request) 
{
    try{
        const {email, password, name, role, Avatar, favoriteCategories} = await req.json();
        if(!email || !password || !name || !role || !Avatar || !favoriteCategories)
        {
            return NextResponse.json({success:false, user: null, message: "Please fill in all fields"}, {status: 400});
        }

        const existingUserByEmail = await database.user.findUnique({
            where: {email: email}
        });
    
        if(existingUserByEmail){
            return NextResponse.json({success:false, user: null, essage: "User already exists"}, {status: 409});
        }
        const saltRounds = 10;
        const hashedpassword = await bcrypt.hash(password, saltRounds);
    
        const newuser = await database.user.create({
            data: {
               email,
               password: hashedpassword,
               name,
               role,
               Avatar,
               favoriteCategories
            }
        });
        const {password:newUserPassword, ...user} = newuser;

        return NextResponse.json({success: true, message:"User created successfully", user:user}, {status: 200});
    }
    catch(e){
        console.log(e);
        return NextResponse.json({success:false , message: "An error occured"}, {status: 500});
    }
}