export const RentalRecipt = ({BookTitle, BookAuthors, BookRentalDate, BookExpectedReturnDate, TotalBooksinlibrary}:{
    BookTitle: string,
    BookAuthors: string[],
    BookRentalDate: string,
    BookExpectedReturnDate: string,
    TotalBooksinlibrary: number
}) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Library Book Rental Invoice</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                padding: 10px 0;
                border-bottom: 1px solid #dddddd;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
            }
            .header .library-name {
                display: inline;
                font-size: 28px; /* Increase the font size here */
            }
            .header .library-name .green {
                color: green;
            }
            .header .library-info {
                margin-top: 10px;
                font-size: 16px;
            }
            .content {
                padding: 20px 0;
            }
            .content h2 {
                margin: 0 0 10px 0;
                font-size: 20px;
            }
            .content p {
                margin: 5px 0;
            }
            .content table {
                width: 100%;
                border-collapse: collapse;
                margin: 20px 0;
            }
            .content table, .content th, .content td {
                border: 1px solid #dddddd;
            }
            .content th, .content td {
                padding: 8px;
                text-align: left;
            }
            .footer {
                text-align: center;
                padding: 10px 0;
                border-top: 1px solid #dddddd;
                font-size: 12px;
                color: #777777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <p class="library-name">bookshelf<span class="green">X</span></p>
                <div class="library-info">
                    <p>With ${TotalBooksinlibrary} books, we are heading to be the best digital library management system. 📖✨</p>
                </div>
                <h1>Library Book Rental Invoice</h1>
            </div>
            <div class="content">
                <h2>Invoice Details</h2>
                <p><strong>Invoice Number:</strong> #123456</p>
                <p><strong>Date:</strong> July 21, 2024</p>
                <h2>Book Details</h2>
                <table>
                    <tr>
                        <th>Book Title</th>
                        <th>Book Authors</th>
                        <th>Rental Date</th>
                        <th>Expected Return Date</th>
                    </tr>
                    <tr>
                        <td>${BookTitle}</td>
                        <td>${BookAuthors.join(", ")}</td>
                        <td>${BookRentalDate}</td>
                        <td>${BookExpectedReturnDate}</td>
                    </tr>
                </table>
                <p>Thank you for renting the book from us! 😊📚 Hopefully, your experience will be as great as our service is. 🌟</p>
            </div>
            <div class="footer">
                <p>Thank you for using our library services!</p>
            </div>
        </div>
    </body>
    </html>
    `;
};


export const ReturnReminder = ({
    BookTitle,
    BookAuthors,
    BookRentalDate,
    BookExpectedReturnDate,
 
}:{
    BookTitle: string,
    BookAuthors: string,
    BookRentalDate: string,
    BookExpectedReturnDate: string,
}) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Library Book Return Reminder</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                padding: 10px 0;
                border-bottom: 1px solid #dddddd;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
            }
            .header .library-name {
                display: inline;
                font-size: 28px; /* Increase the font size here */
            }
            .header .library-name .green {
                color: green;
            }
            .content {
                padding: 20px 0;
            }
            .content h2 {
                margin: 0 0 10px 0;
                font-size: 20px;
            }
            .content p {
                margin: 5px 0;
            }
            .content table {
                width: 100%;
                border-collapse: collapse;
                margin: 20px 0;
            }
            .content table, .content th, .content td {
                border: 1px solid #dddddd;
            }
            .content th, .content td {
                padding: 8px;
                text-align: left;
            }
            .footer {
                text-align: center;
                padding: 10px 0;
                border-top: 1px solid #dddddd;
                font-size: 12px;
                color: #777777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <p class="library-name">bookshelf<span class="green">X</span></p>
                <h1>Library Book Return Reminder</h1>
            </div>
            <div class="content">
                <h2>Reminder Details</h2>
                <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                <h2>Book Details</h2>
                <table>
                    <tr>
                        <th>Book Title</th>
                        <th>Book Authors</th>
                        <th>Rental Date</th>
                        <th>Expected Return Date</th>
                    </tr>
                    <tr>
                        <td>${BookTitle}</td>
                        <td>${BookAuthors}</td>
                        <td>${BookRentalDate}</td>
                        <td>${BookExpectedReturnDate}</td>
                    </tr>
                </table>
                <p>This is a gentle reminder that you have one more day to return the book(s) listed above. Please consider returning the book(s) on time to avoid Overdue. 😊📚</p>
            </div>
            <div class="footer">
                <p>Thank you for using our library services!</p>
            </div>
        </div>
    </body>
    </html>
    `;
};

export const RentalCloser = ({
    BookTitle,
    BookAuthors,
    BookRentalDate,
    BookReturnDate,
}:{
    BookTitle: string,
    BookAuthors: string,
    BookRentalDate: string,
    BookReturnDate: string,
}) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Library Book Rental Closure</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                padding: 10px 0;
                border-bottom: 1px solid #dddddd;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
            }
            .header .library-name {
                display: inline;
                font-size: 28px;
            }
            .header .library-name .green {
                color: green;
            }
            .content {
                padding: 20px 0;
            }
            .content h2 {
                margin: 0 0 10px 0;
                font-size: 20px;
            }
            .content p {
                margin: 5px 0;
            }
            .content table {
                width: 100%;
                border-collapse: collapse;
                margin: 20px 0;
            }
            .content table, .content th, .content td {
                border: 1px solid #dddddd;
            }
            .content th, .content td {
                padding: 8px;
                text-align: left;
            }
            .footer {
                text-align: center;
                padding: 10px 0;
                border-top: 1px solid #dddddd;
                font-size: 12px;
                color: #777777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <p class="library-name">bookshelf<span class="green">X</span></p>
                <h1>Library Book Rental Closure</h1>
            </div>
            <div class="content">
                <h2>Closure Details</h2>
                <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                <h2>Book Details</h2>
                <table>
                    <tr>
                        <th>Book Title</th>
                        <th>Book Authors</th>
                        <th>Rental Date</th>
                        <th>Return Date</th>
                    </tr>
                    <tr>
                        <td>${BookTitle}</td>
                        <td>${BookAuthors}</td>
                        <td>${BookRentalDate}</td>
                        <td>${BookReturnDate}</td>
                    </tr>
                </table>
                <p>Thank you for returning the book(s) on time. We hope you enjoyed reading them. 😊📚</p>
            </div>
            <div class="footer">
                <p>Thank you for using our library services!</p>
            </div>
        </div>
    </body>
    </html>
    `;
};

export const RentalOverdue = ({
    BookTitle,
    BookAuthors,
    BookRentalDate,
    BookExpectedReturnDate,
}:{
    BookTitle: string,
    BookAuthors: string,
    BookRentalDate: string,
    BookExpectedReturnDate: string,
}) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Library Book Rental Overdue</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                padding: 10px 0;
                border-bottom: 1px solid #dddddd;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
            }
            .header .library-name {
                display: inline;
                font-size: 28px;
            }
            .header .library-name .green {
                color: green;
            }
            .content {
                padding: 20px 0;
            }
            .content h2 {
                margin: 0 0 10px 0;
                font-size: 20px;
            }
            .content p {
                margin: 5px 0;
            }
            .content table {
                width: 100%;
                border-collapse: collapse;
                margin: 20px 0;
            }
            .content table, .content th, .content td {
                border: 1px solid #dddddd;
            }
            .content th, .content td {
                padding: 8px;
                text-align: left;
            }
            .footer {
                text-align: center;
                padding: 10px 0;
                border-top: 1px solid #dddddd;
                font-size: 12px;
                color: #777777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <p class="library-name">bookshelf<span class="green">X</span></p>
                <h1>Library Book Rental Overdue</h1>
            </div>
            <div class="content">
                <h2>Overdue Details</h2>
                <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                <h2>Book Details</h2>
                <table>
                    <tr>
                        <th>Book Title</th>
                        <th>Book Authors</th>
                        <th>Rental Date</th>
                        <th>Expected Return Date</th>
                    </tr>
                    <tr>
                        <td>${BookTitle}</td>
                        <td>${BookAuthors}</td>
                        <td>${BookRentalDate}</td>
                        <td>${BookExpectedReturnDate}</td>
                    </tr>
                </table>
                <p>This is a reminder that the book(s) listed above were overdue. Please return them as soon as possible to from next time. 😊📚</p>
            </div>
            <div class="footer">
                <p>Thank you for using our library services!</p>
            </div>
        </div>
    </body>
    </html>
    `;
};

export const RentalReturnRequest = ({
    BookTitle,
    BookAuthors,
    BookRentalDate,
    BookExpectedReturnDate,
}:{
    BookTitle: string,
    BookAuthors: string,
    BookRentalDate: string,
    BookExpectedReturnDate: string,
}) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Library Book Return Request Raised</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                padding: 10px 0;
                border-bottom: 1px solid #dddddd;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
            }
            .header .library-name {
                display: inline;
                font-size: 28px;
            }
            .header .library-name .green {
                color: green;
            }
            .content {
                padding: 20px 0;
            }
            .content h2 {
                margin: 0 0 10px 0;
                font-size: 20px;
            }
            .content p {
                margin: 5px 0;
            }
            .content table {
                width: 100%;
                border-collapse: collapse;
                margin: 20px 0;
            }
            .content table, .content th, .content td {
                border: 1px solid #dddddd;
            }
            .content th, .content td {
                padding: 8px;
                text-align: left;
            }
            .footer {
                text-align: center;
                padding: 10px 0;
                border-top: 1px solid #dddddd;
                font-size: 12px;
                color: #777777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <p class="library-name">bookshelf<span class="green">X</span></p>
                <h1>Library Book Return Request Raised</h1>
            </div>
            <div class="content">
                <h2>Request Details</h2>
                <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                <h2>Book Details</h2>
                <table>
                    <tr>
                        <th>Book Title</th>
                        <th>Book Authors</th>
                        <th>Rental Date</th>
                        <th>Expected Return Date</th>
                    </tr>
                    <tr>
                        <td>${BookTitle}</td>
                        <td>${BookAuthors}</td>
                        <td>${BookRentalDate}</td>
                        <td>${BookExpectedReturnDate}</td>
                    </tr>
                </table>
                <p>A return request has been raised for the book(s) listed above. A librarian will close your request ASAP. 😊📚</p>
            </div>
            <div class="footer">
                <p>Thank you for using our library services!</p>
            </div>
        </div>
    </body>
    </html>
    `;
};

export const RentalReturnConfirmation = ({
    BookTitle,
    BookAuthors,
    BookRentalDate,
    BookReturnDate,
    LibrarianID
}:{
    BookTitle: string,
    BookAuthors: string,
    BookRentalDate: string,
    BookReturnDate: string,
    LibrarianID: string
}) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Library Book Return Confirmation</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                padding: 10px 0;
                border-bottom: 1px solid #dddddd;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
            }
            .header .library-name {
                display: inline;
                font-size: 28px;
            }
            .header .library-name .green {
                color: green;
            }
            .content {
                padding: 20px 0;
            }
            .content h2 {
                margin: 0 0 10px 0;
                font-size: 20px;
            }
            .content p {
                margin: 5px 0;
            }
            .content table {
                width: 100%;
                border-collapse: collapse;
                margin: 20px 0;
            }
            .content table, .content th, .content td {
                border: 1px solid #dddddd;
            }
            .content th, .content td {
                padding: 8px;
                text-align: left;
            }
            .footer {
                text-align: center;
                padding: 10px 0;
                border-top: 1px solid #dddddd;
                font-size: 12px;
                color: #777777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <p class="library-name">bookshelf<span class="green">X</span></p>
                <h1>Library Book Return Confirmation</h1>
            </div>
            <div class="content">
                <h2>Confirmation Details</h2>
                <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                <h2>Book Details</h2>
                <table>
                    <tr>
                        <th>Book Title</th>
                        <th>Book Authors</th>
                        <th>Rental Date</th>
                        <th>Return Date</th>
                    </tr>
                    <tr>
                        <td>${BookTitle}</td>
                        <td>${BookAuthors}</td>
                        <td>${BookRentalDate}</td>
                        <td>${BookReturnDate}</td>
                    </tr>
                </table>
                <p>Your Rental Was Closed by Librarian with ID ${LibrarianID}, We have received the returned book(s) listed above. Thank you for returning them on time. 😊📚</p>
            </div>
            <div class="footer">
                <p>Thank you for using our library services!</p>
            </div>
        </div>
    </body>
    </html>
    `;
};


export const UserRegistration = ({
    UserName,
    UserEmail,
    RegistrationDate,
}:{
    UserName: string,
    UserEmail: string,
    RegistrationDate: string,
}) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Successful User Registration</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                padding: 10px 0;
                border-bottom: 1px solid #dddddd;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
            }
            .header .library-name {
                display: inline;
                font-size: 28px;
            }
            .header .library-name .green {
                color: green;
            }
            .content {
                padding: 20px 0;
            }
            .content h2 {
                margin: 0 0 10px 0;
                font-size: 20px;
            }
            .content p {
                margin: 5px 0;
            }
            .footer {
                text-align: center;
                padding: 10px 0;
                border-top: 1px solid #dddddd;
                font-size: 12px;
                color: #777777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <p class="library-name">bookshelf<span class="green">X</span></p>
                <h1>Welcome to bookshelfX!</h1>
            </div>
            <div class="content">
                <h2>Registration Successful</h2>
                <p><strong>Date:</strong> ${RegistrationDate}</p>
                <p>Dear ${UserName},</p>
                <p>Thank you for registering with bookshelfX. Your account has been successfully created.</p>
                <p>You can now access our library services using the email address: ${UserEmail}</p>
                <p>We are excited to have you on board and look forward to providing you with the best library experience. 😊📚</p>
            </div>
            <div class="footer">
                <p>Thank you for joining bookshelfX!</p>
            </div>
        </div>
    </body>
    </html>
    `;
};
