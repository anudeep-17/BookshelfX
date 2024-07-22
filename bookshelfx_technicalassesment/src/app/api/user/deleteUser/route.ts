import { NextResponse } from "next/server";
import { database } from "../../prismaConfig";
import { NextApiRequest } from "next";

export async function DELETE(req: NextApiRequest) 
{
    const url = new URL(req.url || '');
    const ID = url.searchParams.get('id');

    try{
        const user = await database.user.findUnique({
            where: {id: Number(ID)}
        });
        if(user){
            const {password, ...userData} = user;
            await database.user.delete({
                where: {id: Number(ID)}
            });
            return NextResponse.json({user: userData, message: "User deleted successfully"}, {status: 200});
        }
        else{
            return NextResponse.json({user: null, message: "User not found"}, {status: 404});
        }
    }
    catch(e){
        return NextResponse.json({message: "An error occured"}, {status: 500});
    }
}