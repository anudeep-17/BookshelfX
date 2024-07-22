import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { database } from "../../prismaConfig";
import bcrypt from 'bcrypt';

export async function PATCH(req:Request) 
{
    const {id, password } = await req.json();   
    const hashedpassword = await bcrypt.hash(password, 10);

    try{
        const user = await database.user.findUnique({
            where: {id: Number(id)}
        });
        if(user){
            const updatedUser = await database.user.update({
                where: {id: Number(id)},
                data: {
                    password: hashedpassword 
                }
            });
            return NextResponse.json({user: updatedUser, message: "Password updated successfully"}, {status: 200});
        }
        else{
            return NextResponse.json({user: null, message: "User not found"}, {status: 404});
        }
    }
    catch(e){
        return NextResponse.json({message: "An error occured"}, {status: 500});
    }
}