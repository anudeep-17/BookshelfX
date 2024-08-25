import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { database } from "../../../prismaConfig";
import bcrypt from 'bcrypt';

export async function POST(req:Request) 
{
    const {id, password } = await req.json();   
    if(!id || !password){
        return NextResponse.json({success:false, message: "User id and password are required"}, {status: 400});
    }
    
    try{
        const user = await database.user.findUnique({
            where: {id: Number(id)}
        });
        if(user)
        {
            if(await bcrypt.compare(password, user.password))
            {
                return NextResponse.json({success:false, message: "New password cannot be the same as the old password"}, {status: 400});
            }

            const hashedpassword = await bcrypt.hash(password, 10);
            
            const updatedUser = await database.user.update({
                where: {id: Number(id)},
                data: {
                    password: hashedpassword 
                }
            });

            if(updatedUser)
            {
                return NextResponse.json({success:true, message: "Password updated successfully"}, {status: 200});
            }
            return NextResponse.json({success:false, message: "Password update failed"}, {status: 400});
        }
        else
        {
            return NextResponse.json({success:false, message: "User not found"}, {status: 404});
        }
    }
    catch(e){
        return NextResponse.json({success:false, message: "An error occurred while updating password"}, {status: 500});
    }
}