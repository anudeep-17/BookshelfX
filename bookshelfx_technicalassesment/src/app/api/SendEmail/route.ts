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
            from: 'Monika - BookShelfX Library Assistant <noreply@bookshelfx.store>',
            to: ['anudeepsai88@gmail.com'],
            subject: 'Rental Receipt from BookshelfX: Confirmation of your rental, hopefully you enjoy the book!',
            html: RentalRecipt({
                BookTitle: "48 laws of power",
                BookAuthors: ["robert greene"],
                BookRentalDate: "2021-09-01",
                BookExpectedReturnDate: "2021-09-30",
                TotalBooksinlibrary: 281
            })
        });
        console.log(data);
        return NextResponse.json(data);
    }
    catch(error)
    {
        return NextResponse.json(error);
    }
} 