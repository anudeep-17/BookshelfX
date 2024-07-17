export async function AllStats(LibrarianId: number)
{
    let url;
    if(LibrarianId)
    {
        url =`/api/books/librarian/AllStats?LibrarianId=${LibrarianId}`;
    }
    else
    {
        url =`/api/books/librarian/AllStats`;
    }

    const response = await fetch(url,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data;
}

export async function getBooksFromGoogleBooks(title: string, authors: string, publisher: string, category:string, startIndex: number, maxResults: number)
{
    const response = await fetch(`/api/books/librarian/GoogleAPISupport/getBookFromGoogleApi?title=${title}&authors=${authors}&publisher=${publisher}&category=${category}&startIndex=${startIndex}&maxResults=${maxResults}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data;
}

export async function isBookAlreadyInShelf(title: string, author: string[])
{
    const encodedtitle = encodeURIComponent(title);
    const encodedauthor = author.map((author) => encodeURIComponent(author));
    console.log(encodedtitle, encodedauthor);
    const response = await fetch(`/api/books/librarian/addBooks/isBookAlreadyInShelf?title=${encodedtitle}&author=${encodedauthor}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data;
}

export async function DeleteBook(title: string, authors: string[])
{
 
    const response = await fetch(`/api/books/librarian/deleteBooks?title=${title}&authors=${authors.join(", ")}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data;
}

export async function DeleteBookList(books: { title: string, authors: string[] }[]) {
    const results = [];

    for (const book of books) {
        const response = await fetch(`/api/books/librarian/deleteBooks?title=${book.title}&authors=${book.authors.join(", ")}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        results.push(data);
    }

    return results;
}
