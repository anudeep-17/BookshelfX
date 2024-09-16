import { NextResponse } from "next/server";
import { Resend } from 'resend';
import { RentalRecipt, RentalCloser, RentalOverdue, RentalReturnRequest, UserRegistration, UserDeletion, BookReview } from "./EmailTemplates";

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
        DeletionDate,
        role, 
        BookReview,
        ReviewContent, 
        BookReviewDate,
        BookReviewDeletionDate,
    } = await req.json();

    let functiontoexecute = null;
    let subject = null;

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
        subject = 'Rental Receipt from BookshelfX: Confirmation of your rental, hopefully you enjoy the book!';
        functiontoexecute = RentalRecipt({BookTitle, BookAuthors, BookRentalDate, BookExpectedReturnDate, TotalBooksinlibrary});
    }
    else if(task === "RentalCloser")
    {
        if(!BookTitle || !BookAuthors || !BookRentalDate  || !BookReturnDate)
        {
            return NextResponse.json({ success: false, message: "BookTitle, BookAuthors, BookRentalDate, BootReturnDate are required" }, {status: 400});
        }
        subject = 'Rental Closer from BookshelfX: Thank you for returning the book!';
        functiontoexecute = RentalCloser({BookTitle, BookAuthors, BookRentalDate, BookReturnDate});
    }
    else if(task === "RentalOverdue")
    {
        if(!BookTitle || !BookAuthors || !BookRentalDate || !BookExpectedReturnDate)
        {
            return NextResponse.json({ success: false, message: "BookTitle, BookAuthors, BookRentalDate, BookExpectedReturnDate are required" }, {status: 400});
        }
        subject = 'Rental Overdue from BookshelfX: Please return the book as soon as possible';
        functiontoexecute = RentalOverdue({BookTitle, BookAuthors, BookRentalDate, BookExpectedReturnDate });
    }
    else if(task === "RentalReturnRequest")
    {
        if(!BookTitle || !BookAuthors || !BookRentalDate || !BookExpectedReturnDate )
        {
            return NextResponse.json({ success: false, message: "BookTitle, BookAuthors, BookRentalDate, BookExpectedReturnDate are required" }, {status: 400});
        }
        subject = 'Rental Return Request from BookshelfX: Please return the book as soon as possible';
        functiontoexecute = RentalReturnRequest({BookTitle, BookAuthors, BookRentalDate, BookExpectedReturnDate});
    }
    else if(task === "UserRegistration")
    {
        if(!UserName || !UserEmail || !RegistrationDate || !role)
        {
            return NextResponse.json({ success: false, message: "UserName, UserEmail, RegistrationDate, role are required" }, {status: 400});
        }
        subject = 'User Registration from BookshelfX: Welcome to BookshelfX';
        functiontoexecute = UserRegistration({UserName, UserEmail, RegistrationDate, role});
    }
    else if(task === 'AccountDeletion')
    {
        if(!UserName || !UserEmail || !DeletionDate || !role)
        {
            return NextResponse.json({ success: false, message: "UserName, UserEmail, DeletionDate, role are required" }, {status: 400});
        }
        subject = 'User Account deletion from BookshelfX: Adieu from BookshelfX';
        functiontoexecute = UserDeletion({UserName, UserEmail, DeletionDate, role});
    }
    else if(task === 'BookReview')
    {
        if(!BookTitle || !BookAuthors || !BookReview || !ReviewContent)
        {
            return NextResponse.json({ success: false, message: "BookTitle, BookAuthors, BookRentalDate, BookExpectedReturnDate, TotalBooksinlibrary are required" }, {status: 400});
        }
        subject = 'Book Review from BookshelfX: Your review has been published';
        functiontoexecute = BookReview({BookTitle, BookAuthors, BookReview, ReviewContent, BookReviewDate});
    }
    else if(task === 'BookReviewDeletion')
    {
        if(!BookTitle || !BookAuthors || !BookReview || !ReviewContent || !BookReviewDeletionDate)
        {
            return NextResponse.json({ success: false, message: "BookTitle, BookAuthors, BookReview, ReviewContent, BookReviewDeletionDate are required" }, {status: 400});
        }
        subject = 'Book Review Deletion from BookshelfX: Your review has been deleted';
        functiontoexecute = BookReview({BookTitle, BookAuthors, BookReview, ReviewContent, BookReviewDeletionDate});
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
            subject:  subject,
            html: functiontoexecute,
        });
        return NextResponse.json(data);
    }
    catch(error)
    {
        return NextResponse.json(error);
    }
} 