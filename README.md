# BookshelfX: Library Management System -- Technical Assesment
## Introduction

Welcome to BookShelfX! This full-stack web application replicates the functionality of a local library, allowing librarians to manage books and customers to borrow them. The application supports user authentication, book checkout, customer reviews, and more.

## Documents to Explain the application:
- <a href ="https://docs.google.com/presentation/d/1_UGKx3D1e9rAA5mn69heauWKn0tcD_15/edit?usp=sharing&ouid=106341078487048229041&rtpof=true&sd=true">PPT about the application</a>
- <a href="https://drive.google.com/file/d/1-qhXPTJAJR2wPTPE4VrkXXB6XlfUwwGd/view?usp=drive_link">Software requirement specification document</a>
- <a href="https://drive.google.com/file/d/1PT0_CdRyjbYapgowLKv9z2UmDpyFizlC/view?usp=drive_link">database diagram</a>
  
## How to Run

### Prerequisites

- <a href="https://nodejs.org/en/download/package-manager">Node.js</a>
- <a href="https://docs.npmjs.com/downloading-and-installing-node-js-and-npm">npm</a>
- <a href="https://nextjs.org/docs/getting-started/installation"> Next.js </a>
- PostgreSQL, pgadmin4 {optional} -
  do checkout https://www.youtube.com/watch?v=PShGF_udSpk for setting postgresSQl. 
### .env and .env.local file for the application 
This application has requirement for .env and .env.local files to run the application locally while I cannot share my files here due to privacy issues, would share a format of how does the file  shoudl look like so you can set it up for your requirement, also will leave few tutorial links  next to them for your reference to set them up.<br/>

<ins>.env file:</ins>
  ```env
    DATABASE_URL="postgres://username:password@host:port/dbname"
    GOOGLE_BOOKS_API_KEY="<INSERT YOU GOOGLEBOOKS API KEY HERE>" #Resource: https://developers.google.com/books/docs/v1/using
  ```
-**How to get database URl ??????** - In PostgresSQl create a database called bookShelfX and the formulate a url that would look like 
  ```
  postgres Url format postgres://username:password@host:port/dbname

  #-------------------------------------------------------------------
  # - **`postgresql://`**: This specifies the protocol and the type of database you're connecting to, which in this case is PostgreSQL.
  # - **`username`**: This is the username used to connect to the database.
  # - **`password`**: This is the password for the 'username' user.
  # - **`host`**: This indicates that the database server is running on the local machine.
  # - **`port`**: This is the port number on which the PostgreSQL server is listening for connections. The default port for PostgreSQL is 5432.
  # - **`bookShelfX`**: This is the name of the database you want to connect to.
  # So, this URL connects to a PostgreSQL database named `bookShelfX` running on your local machine, using the `username` user with the password.
  ```
- Input this URL in the .env File to use it

<ins>.env.local  file:</ins> 
  
  ```env
    OPENAI_API_KEY='<INSERT OPENAI API KEY HERE>' #Resource : https://platform.openai.com/docs/api-reference/introduction
    RESEND_API='<INSERT RESEND API KEY HERE>' #Resource :  https://resend.com/docs/api-reference/introduction
  ```

### Running the application 
- Now in Terminal put the below commands in the same sequence as given
  ```
    npm i
    npx prisma migrate dev
  ```
- Once the migration of the database schema is done, use the following command to seed the database
  ```
    npx prisma db seed
  ```
- Once the database seeding is finished, checkout the /prisma/userData.txt for mock username and passwords with the specific role of the account for testing the application
- Now run the NextJS app using command
  ```
    npm run dev
  ```

### Access the Application

- Open your browser and navigate to `http://localhost:3000`.


## Deployment

This application is also deployed using Vercel. You can access the live version <a href="www.bookshelfx.store">here</a>.

## Tech Stack

- **Frontend:** Next.js, TypeScript, MUI (Material-UI)
- **Backend:** Next.js
- **Database:** PostgreSQL [Local and <a href ="https://vercel.com/docs/storage/vercel-postgres">Serverless over vercel</a>]
- **ORM:** Prisma
- **Deployment:** Vercel

---

## Task Checklist given as Requirements
### Build a frontend application 
- [x] Use Typescript
- [x] Use a single-page application framework/library (NextJs)
  ### Features:
    i. Users
     - [x] Users should be able to sign up, log in, and log out.
     - [x] During sign-up, allow the user to specify if they are a Librarian or a Customer.
  
    ii. Featured Books
    - [x] Display a list of random books that includes the Title, Author,
    Description, Cover Image, and Average User Rating of each book.
    - [x] Users can filter and sort books by Title, Author, and Availability.
    
    iii. View Book Details
    - [x] When a user selects a book, they should view the book's complete
    details including new fields such as Publisher, Publication Date,
    Category, ISBN, Page Count, and Customer Reviews.
    
    iv. Search For Books
    - [x] Implement a search functionality that allows users to search for
    books by text that is partially contained in the book’s title.
    
    v. Manage Books
    - [x] A librarian can add a new book, edit an existing book, or remove a
    book from the library.
    
    vi. Book Checkout
    - [x] A customer can check out a book if it is available
    - [x] A book is checked out for 5 days
    - [x] There is only one copy of each book in this library
    - [x] Only a librarian can mark a book as returned to the library
    
    vii. Customer Reviews
     - [x] A customer can leave a review for a book that consists of a short
      message and a rating from 1-5 stars.
### Create an API
- [x] The API should have controllers and routes that support all functionality needed
for the application
- [x] Support authentication and authorization
- [x] Use an ORM with code-first database migrations
  ### On Start,
   - [x] The database should be created and migrations applied
   - [x] The database should be seeded with Books
  ### PostgreSQL:
   - [x] Ensure the Book table includes,
   - [x] Title, Author, Description, Cover Image, Publisher, Publication Date,
         Category, ISBN, Page Count
### Bonus
- [x] Add the ability for a Librarian to view all checked-out books and their due dates
- [x] Use a component library
- [ ] Add a unit test for the API
- [x] Create a database diagram
- [ ] Implement a feature using WebSockets

## Conclusion

Working on this project has been a rewarding experience. It provided an opportunity to integrate various technologies and create a functional, user-friendly application. The process of building both the frontend and backend, ensuring seamless interaction between them, and deploying the application has been both challenging and fulfilling.

Thank you for checking out BookShelfX! Feel free to contribute or provide feedback.
 
