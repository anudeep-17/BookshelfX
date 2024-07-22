import { NextResponse } from "next/server";
import { Resend } from 'resend';
import { RentalRecipt } from "./EmailTemplates";

export async function GET(req: Request)
{
    const url = new URL(req.url);
    const task = url.searchParams.get('task');

    const resend = new Resend(process.env.RESEND_API);
    try
    {
        const {data} = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: ['anudeepsai88@gmail.com'],
            subject: 'Rental Receipt from BookshelfX: Confirmation of your rental, hopefully you enjoy the book!',
            html: RentalRecipt,
        });
        console.log(data);
        return NextResponse.json(data);
    }
    catch(error)
    {
        return NextResponse.json(error);
    }
} 