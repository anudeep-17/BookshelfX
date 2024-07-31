import { NextResponse } from "next/server";
import { database } from "../../../prismaConfig";
import bcrypt from 'bcrypt';

export async function POST(req:Request) 
{
    const {id, favoriteCategories } = await req.json();   

    if(!id || !favoriteCategories){
        return NextResponse.json({success:false, message: "User id and favorite categories are required"}, {status: 400});
    }
        
    try{
        const user = await database.user.findUnique({
            where: {id: Number(id)}
        });
        if(user){
            if(user.favoriteCategories === favoriteCategories)
            {
                return NextResponse.json({success:false, message: "New favorite categories cannot be the same as the old favorite categories"}, {status: 400});
            }

            const updatedUser = await database.user.update({
                where: {id: Number(id)},
                data: {
                    favoriteCategories: favoriteCategories
                }
            });

            if(updatedUser)
            {
                return NextResponse.json({success:true, message: "Favorite categories updated successfully"}, {status: 200});
            }

            return NextResponse.json({success:false, message: "Favorite categories update failed"}, {status: 400});
        }
        else{
            return NextResponse.json({success:false, message: "User not found"}, {status: 404});
        }
    }
    catch(e){
        return NextResponse.json({success:false, message: "An error occurred while updating favorite categories"}, {status: 500});
    }
}