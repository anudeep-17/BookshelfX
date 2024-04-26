import { NextResponse } from "next/server";
import { database } from "../../prismaConfig";
import { NextApiRequest } from "next";

export async function GET(req: NextApiRequest) 
{

    try{
        const user = await database.user.findMany();
        if(user){
            return NextResponse.json({user: user}, {status: 200});
        }
        else{
            return NextResponse.json({user: null, message: "User not found"}, {status: 404});
        }
    }
    catch(e){
        return NextResponse.json({message: "An error occured"}, {status: 500});
    }
}