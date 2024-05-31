import { NextResponse } from "next/server";
import OpenAI from "openai";
const openai = new OpenAI();

export async function POST(req: Request) 
{ 
    const { messages } = await req.json();
    console.log(messages[messages.length-1]);
    try{
        const completion = await openai.chat.completions.create({
            messages: messages,
            model: "gpt-4o",
          });
        
        return NextResponse.json({success: true, data: completion},{status : 200});
    }
    catch(err){
        console.error(err);
        return NextResponse.json({success: false, message: err},{status : 500});
    }
}