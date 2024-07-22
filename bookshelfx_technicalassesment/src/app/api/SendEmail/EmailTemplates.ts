export const RentalRecipt = '<head>\
<meta charset="UTF-8">\
<meta name="viewport" content="width=device-width, initial-scale=1.0">\
<title>Library Book Rental Invoice</title>\
<style>\
    body {\
        font-family: Arial, sans-serif;\
        margin: 0;\
        padding: 0;\
        background-color: #f4f4f4;\
    }\
    .container {\
        width: 100%;\
        max-width: 600px;\
        margin: 0 auto;\
        background-color: #ffffff;\
        padding: 20px;\
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\
    }\
    .header {\
        text-align: center;\
        padding: 10px 0;\
        border-bottom: 1px solid #dddddd;\
    }\
    .header h1 {\
        margin: 0;\
        font-size: 24px;\
    }\
    .header .library-name {\
        display: inline;\
        font-size: 28px; /* Increase the font size here */\
    }\
    .header .library-name .green {\
        color: green;\
    }\
    .content {\
        padding: 20px 0;\
    }\
    .content h2 {\
        margin: 0 0 10px 0;\
        font-size: 20px;\
    }\
    .content p {\
        margin: 5px 0;\
    }\
    .footer {\
        text-align: center;\
        padding: 10px 0;\
        border-top: 1px solid #dddddd;\
        font-size: 12px;\
        color: #777777;\
    }\
</style>\
</head>\
<body>\
<div class="container">\
    <div class="header">\
        <p class="library-name">bookshelf<span class="green">X</span></p>\
        <h1>Library Book Rental Invoice</h1>\
    </div>\
    <div class="content">\
        <h2>Invoice Details</h2>\
        <p><strong>Invoice Number:</strong> #123456</p>\
        <p><strong>Date:</strong> July 21, 2024</p>\
        <h2>Book Details</h2>\
        <p><strong>Title:</strong> The Great Gatsby</p>\
        <p><strong>Author:</strong> F. Scott Fitzgerald</p>\
        <p><strong>Rental Period:</strong> 14 days</p>\
        <p><strong>Due Date:</strong> August 4, 2024</p>\
        <h2>Rental Fees</h2>\
        <p><strong>Rental Fee:</strong> $5.00</p>\
        <p><strong>Late Fee (if any):</strong> $0.00</p>\
        <h2>Total Amount Due</h2>\
        <p><strong>Total:</strong> $5.00</p>\
    </div>\
    <div class="footer">\
        <p>Thank you for using our library services!</p>\
    </div>\
</div>\
</body>';

const RentalReminder = '';
const RentalClosure = '';
const RentalOverdue = '';
const UserRegistration = '';