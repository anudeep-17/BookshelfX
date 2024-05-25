export async function getBook()
{
    const response = await fetch('/api/books/getAllBooks');
    const data = await response.json();
    return data;
}

export async function getCategories()
{
    const response = await fetch('/api/books/getCategories');
    const data = await response.json();
    return data;
}

export async function getBooksByCategory(category: string)
{
    const response = await fetch(`/api/books/getBooksByCategory?category=${category}`);
    const data = await response.json();
    return data;
}

export async function getBookByID(id: string)
{
    const response = await fetch(`/api/books/getBookByID?id=${id}`);
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
        const response = await fetch(`/api/favouriteBook/addFavBook`, {
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

export async function getFavBooks(userId: string, bookId: string)
{
    console.log(userId, bookId);
    const response = await fetch(`/api/favouriteBook/getFavBooks?userId=${userId}&bookId=${bookId}`);
    const data = await response.json();
    return data;
}

export async function removeFavBooks(userId: number, bookId: number)
{
    const response = await fetch(`/api/favouriteBook/RemoveFavBook`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userId, bookId})
    });
    const data = await response.json();
    return data;
}
