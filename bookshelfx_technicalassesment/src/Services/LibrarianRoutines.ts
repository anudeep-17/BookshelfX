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