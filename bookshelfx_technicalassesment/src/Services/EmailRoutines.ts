 
export async function EmailRoutines({
    task, 
    BookTitle, 
    BookAuthors,
    BookRentalDate,
    BookExpectedReturnDate,
    BookReturnDate, 
    UserName, 
    UserEmail,
    RegistrationDate,
    role, 
    DeletionDate, 
    BookReviewDate, 
    BookReviewDeletionDate,
    BookRating,
    ReviewContent
}:{
    task: string;
    BookTitle?: string;
    BookAuthors?: string;
    BookRentalDate?: Date;
    BookExpectedReturnDate?: Date;
    BookReturnDate?: Date;
    UserName?: string;
    UserEmail?: string;
    RegistrationDate?: Date;
    role?: string;
    DeletionDate?: Date;
    BookReviewDate?: Date;
    BookReviewDeletionDate?: Date;
    BookRating?: number;
    ReviewContent?: string;
})
{
    let body = {};

    if(task === "RentalRecipt") {
        body = { task, BookTitle, BookAuthors, BookRentalDate, BookExpectedReturnDate, UserEmail };
    }
    else if(task === "RentalOverdue" || task === "RentalReturnRequest") {
        body = { task, BookTitle, BookAuthors, BookRentalDate, BookExpectedReturnDate, UserEmail };
    }
    else if(task === "RentalCloser") {
        body = { task, BookTitle, BookAuthors, BookRentalDate, BookReturnDate, UserEmail};
    }
    else if(task === "UserRegistration") {
        body = { task, UserName, UserEmail, RegistrationDate, role };
    }
    else if(task === "AccountDeletion") {
        body = { task, UserEmail, DeletionDate, role };
    }
    else if(task === "BookReview") {
        body = { task, BookTitle, BookAuthors, UserEmail, BookReviewDate, BookRating, ReviewContent};
    } 
    else if(task === "BookReviewDeletion") {
        body = { task, BookTitle, BookAuthors, UserEmail, BookReviewDeletionDate };
    }   
    else {
        return { success: false, message: "Task is required" };
    }

    const EmailSender = await fetch('/api/SendEmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    
    const EmailSenderResponse = await EmailSender.json();
    return EmailSenderResponse;
}