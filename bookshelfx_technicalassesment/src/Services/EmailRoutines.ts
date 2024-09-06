 
export async function EmailRoutines({
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
    role, 
    DeletionDate
}:{
    task: string;
    BookTitle?: string;
    BookAuthors?: string;
    BookRentalDate?: Date;
    BookExpectedReturnDate?: Date;
    TotalBooksinlibrary?: number;
    BookReturnDate?: Date;
    UserName?: string;
    UserEmail?: string;
    RegistrationDate?: Date;
    role?: string;
    DeletionDate?: Date;
})
{
    let body = {};

    if(task === "RentalRecipt") {
        body = { task, BookTitle, BookAuthors, BookRentalDate, BookExpectedReturnDate, TotalBooksinlibrary, UserEmail };
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