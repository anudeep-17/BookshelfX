export async function getBook()
{
    const response = await fetch('/api/books/getAll/Books');
    const data = await response.json();
    console.log(data);
    return data;
}

export async function getCategories()
{
    const response = await fetch('/api/books/getAll/Categories');
    const data = await response.json();
    return data;
}

//================================================================================================= Book By _____ ROUTINES ================================================================================================
export async function getBooksByCategory(category: string)
{
    const response = await fetch(`/api/books/getBooksBy/Category?category=${category}`);
    const data = await response.json();
    return data;
}

export async function getBookByID(id: string)
{
    const response = await fetch(`/api/books/getBookBy/ID?id=${id}`);
    const data = await response.json();
    return data;
}

//================================================================================================= Rental ROUTINES ================================================================================================
export async function setAvailabilityofBook(bookId: number, availability: boolean, userId:number)
{
    const response = await fetch(`/api/books/setAvailabilityofBook`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({bookId, availability, userId})
    });
    const data = await response.json();
    return data;

}

export async function getRentalsofUser(userID: number)
{
    const response = await fetch(`/api/user/getRentalsofUser?userId=${userID}`);
    const data = await response.json();
    return data;
}

//---------------------------------------------------------------------------------------------- Search Book ROUTINES-----------------------------------------------------------------------------------------------

export async function searchBook(title?: string, author?: string, category?: string, publisher?: string)
{
    if(!title && !author && !category && !publisher)
    {
        return {success: false, message: "Atleast one search parameter is required"};
    }
    
    const params = [
        title ? `title=${title}` : null,
        author ? `author=${author}` : null,
        category ? `category=${category}` : null,
        publisher ? `publisher=${publisher}` : null,
      ].filter(Boolean).join('&');
    const response = await fetch(`/api/books/searchbook?${params}`);
    const data = await response.json();
    return data;
}

//-----------------------------------------------------------------------------------------------FAV BOOK ROUTINES-----------------------------------------------------------------------------------------------
export async function addFavBooks(userId: number, bookId: number)
{
    if(!userId || !bookId)
    {
       return {success: false, message: "userId and bookId are required"};
    }
    else
    {
        const response = await fetch(`/api/user/favouriteBook/addFavBook`, {
            method: 'POST',
            headers: {
                 'Content-Type': 'application/json'
            },
            body: JSON.stringify({userId, bookId})
        });
       const data = await response.json();
       return data;
    }
}

export async function removeFavBooks(userId: number, bookId: number)
{
    const response = await fetch(`/api/user/favouriteBook/RemoveFavBook`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userId, bookId})
    });
    const data = await response.json();
    return data;
}

export async function getFavBooksByUser(userId: number)
{
    const response = await fetch(`/api/user/favouriteBook/getFavBooks?userId=${userId}`);
    const data = await response.json();
    return data;
}