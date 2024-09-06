import { User } from '../Components/interfaceModels';

export async function RegisterUser({email, password, name, role, Avatar, favoriteCategories}: User)
{
    const response = await fetch('/api/user/addUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password,
            name,
            role,
            Avatar, 
            favoriteCategories
        })
    });
    return await response.json();
}

//=======================================================  User Authentication  ========================================================
export async function GetUser({id}: {id: number})
{
    const response = await fetch(`/api/user/getUser?id=${id}`);
    return await response.json();
}

export async function Authentication({email, password}: {email: string, password: string})
{
    const response = await fetch('/api/user/authenticate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });
    const responseData = await response.json();
    return responseData;
}
//=======================================================  User Profile  ========================================================
// add new password, avatar, and favorite categories
export async function UpdateUserPassword({id, password}: {id: number, password: string})
{
    const response = await fetch('/api/user/update/updatePassword', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id,
            password
        })
    });
    return await response.json();
}

export async function UpdateUserFavoriteCategories({id, favoriteCategories}: {id: number, favoriteCategories: string[]})
{
    const response = await fetch('/api/user/update/updateFavouriteCategories', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id,
            favoriteCategories
        })
    });
    return await response.json();
}
//=======================================================  Book Reviewing  ========================================================
export async function addAReviewToBook({bookId, userID, rating, review}: {bookId: number, userID: number, rating: number, review: string})
{
    const response = await fetch('/api/user/reviewBook/leaveAReviewForBook', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            bookId,
            userID,
            rating,
            review
        })
    });
    return await response.json();
}

export async function CheckIfAReveiwIsAlreadyGivenForTheBook(bookId: number, userID: number)
{   
    const response = await fetch('/api/user/reviewBook/isReviewAlreadyGivenForTheBook', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            bookId,
            userID,
        })
    });
    return await response.json();
}

export async function DeleteAReviewForABook(bookId: number, userID: number)
{
    const response = await fetch('/api/user/reviewBook/deleteAReviewForABook', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            bookId,
            userID,
        })
    });
    return await response.json();
}
//=======================================================  Delete Account  ========================================================
export async function DeleteAccount({id}: {id: number})
{
    const response = await fetch(`/api/user/deleteUser?id=${id}`, {
        method: 'DELETE'
    });
    return await response.json();
}
