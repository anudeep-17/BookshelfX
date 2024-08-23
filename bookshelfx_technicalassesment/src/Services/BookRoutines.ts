import { Book } from "@/Components/interfaceModels";

export async function getBooks(page: number, limit: number)
{
    const response = await fetch(`/api/books/getAll/Books?page=${page}&limit=${limit}`);
    const data = await response.json();
    return data;
}

export async function getCategoryBasedBooks(page: number, limit: number) 
{
    const response = await fetch(`/api/books/getAll/CategoryBasedBook?page=${page}&limit=${limit}`);
    const data = await response.json();
    return data;
}

export async function getFeaturedBooks(page: number, limit: number)
{
    const response = await fetch(`/api/books/getAll/FeaturedBooks?page=${page}&limit=${limit}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data;
}

export async function getFeaturedBooksForFilters(page: number, limit: number, availabilityFilterPassed: boolean, authorsFilterPassed: string[], categoriesFilterPassed: string[])
{
    const response = await fetch(`/api/books/getAll/FeaturedBooks/forGivenFilters?page=${page}&limit=${limit}`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({availabilityFilterPassed, authorsFilterPassed, categoriesFilterPassed})
    });
    const data = await response.json();
    return data;
}

//================================================================================================= GetAll ROUTINES ================================================================================================
export async function getCategories()
{
    const response = await fetch('/api/books/getAll/Categories',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data;
}

export async function getAuthors()
{
    const response = await fetch('/api/books/getAll/Authors',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data;

}

export async function getPublishers()
{
    const response = await fetch('/api/books/getAll/Publisher',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data;
}

//================================================================================================= Book By _____ ROUTINES ================================================================================================
export async function getBooksByCategory(category: string, page?: number, limit?: number)
{
    if(!category)
    {
        return {success: false, message: "Category is required"};
    }
    
    category = encodeURIComponent(category);
    let url = `/api/books/getBookBy/Category?category=${category}`;
    if (page && limit) {
        url += `&page=${page}&limit=${limit}`;
    }
    const response = await fetch(url);
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
    const response = await fetch(`/api/books/RentalManagement`, {
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

export async function getActiveRentalsOfUser(userID: number)
{
    const response = await fetch(`/api/user/getRentalsofUser/ActiveRentals?userId=${userID}`);
    const data = await response.json();
    return data;
}


export async function isbookrentedbycurrentuser(bookID:number, userID:number)
{
    const response = await fetch(`/api/books/RentalManagement/IsItRentedByCurrentUser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({bookID, userID})
    });
    
    const data = await response.json();
    return data;
}

export async function isuserReturnInitiated(bookID:number, userID:number)
{
    const response = await fetch(`/api/books/RentalManagement/isuserReturnInitiated`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({bookID, userID})
    });
    const data = await response.json();
    return data;

}

export async function isbookrentedByUserPreviously(bookID:number, userID:number)
{
    const response = await fetch(`/api/books/RentalManagement/isBookRentedByUserPreviously`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({bookID, userID})
    });
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

//================================================================================================= Book Count ROUTINES ================================================================================================

export async function getFeaturedBooksCount()
{
    const response = await fetch(`/api/books/getCountOf/featuredBooks`);
    const data = await response.json();
    return data;
}

export async function getBooksCountByCategory(category: string)
{
    if(!category)
    {
        return {success: false, message: "Category is required"};
    }
    category = encodeURIComponent(category);
    const response = await fetch(`/api/books/getCountOf/categoryWiseBooks?category=${category}`);
    const data = await response.json();
    return data;
}

export async function getAllBooksCount()
{
    const response = await fetch(`/api/books/getCountOf/allBooks`);
    const data = await response.json();
    return data;
}

//================================================================================================= Book Insertion ROUTINES ================================================================================================
export async function addBookToLibrary(book: Book)
{
    const response = await fetch(`/api/books/librarian/addBooks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    });
    const data = await response.json();
    return data;
}