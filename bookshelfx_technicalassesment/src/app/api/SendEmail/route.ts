import { NextResponse } from "next/server";
import { Resend } from 'resend';
import { RentalRecipt, RentalCloser, RentalOverdue, RentalReturnRequest, UserRegistration } from "./EmailTemplates";

export async function POST(req: Request)
{
    const {
        task,
        BookTitle, 
        BookAuthors,
        BookRentalDate,
        BookExpectedReturnDate,
        TotalBooksinlibrary,
        BookReturnDate, 
        UserName, 
        UserEmail,
        RegistrationDate,
    } = await req.json();

    let functiontoexecute = null;

    if(!task || UserEmail === undefined)
    {
        return NextResponse.json({ success: false, message: "Task and userEmail is required" }, {status: 400});
    }
    if(task === "RentalRecipt")
    {
        if(!BookTitle || !BookAuthors || !BookRentalDate || !BookExpectedReturnDate || !TotalBooksinlibrary)
        {
            return NextResponse.json({ success: false, message: "BookTitle, BookAuthors, BookRentalDate, BookExpectedReturnDate, TotalBooksinlibrary are required" }, {status: 400});
        }
        functiontoexecute = RentalRecipt({BookTitle, BookAuthors, BookRentalDate, BookExpectedReturnDate, TotalBooksinlibrary});
    }
    else if(task === "RentalCloser")
    {
        if(!BookTitle || !BookAuthors || !BookRentalDate  || !BookReturnDate)
        {
            return NextResponse.json({ success: false, message: "BookTitle, BookAuthors, BookRentalDate, BootReturnDate are required" }, {status: 400});
        }
        functiontoexecute = RentalCloser({BookTitle, BookAuthors, BookRentalDate, BookReturnDate});
    }
    else if(task === "RentalOverdue")
    {
        if(!BookTitle || !BookAuthors || !BookRentalDate || !BookExpectedReturnDate)
        {
            return NextResponse.json({ success: false, message: "BookTitle, BookAuthors, BookRentalDate, BookExpectedReturnDate are required" }, {status: 400});
        }
        functiontoexecute = RentalOverdue({BookTitle, BookAuthors, BookRentalDate, BookExpectedReturnDate });
    }
    else if(task === "RentalReturnRequest")
    {
        if(!BookTitle || !BookAuthors || !BookRentalDate || !BookExpectedReturnDate )
        {
            return NextResponse.json({ success: false, message: "BookTitle, BookAuthors, BookRentalDate, BookExpectedReturnDate are required" }, {status: 400});
        }
        functiontoexecute = RentalReturnRequest({BookTitle, BookAuthors, BookRentalDate, BookExpectedReturnDate});
    }
    else if(task === "UserRegistration")
    {
        if(!UserName || !UserEmail || !RegistrationDate)
        {
            return NextResponse.json({ success: false, message: "UserName, UserEmail, RegistrationDate are required" }, {status: 400});
        }
        functiontoexecute = UserRegistration({UserName, UserEmail, RegistrationDate});
    }
    else
    {
        return NextResponse.json({ success: false, message: "Invalid task" }, {status: 400});
    }

    const resend = new Resend(process.env.RESEND_API);
    
    try
    {
        const {data} = await resend.emails.send({
            from: 'Monika - BookShelfX Library Assistant <noreply@bookshelfx.store>',
            to: [ UserEmail ],
            subject: 'Rental Receipt from BookshelfX: Confirmation of your rental, hopefully you enjoy the book!',
            html: functiontoexecute,
        });
        return NextResponse.json(data);
    }
    catch(error)
    {
        return NextResponse.json(error);
    }
} 