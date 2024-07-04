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