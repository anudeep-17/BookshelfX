import { User } from '../Components/interfaceModels';

export async function RegisterUser({email, password, name, role}: User)
{
    const response = await fetch('/api/user/createUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password,
            name,
            role
        })
    });
    return await response.json();
}

export async function GetUser({id}: {id: number})
{
    const response = await fetch(`/api/user/getUser?id=${id}`);
    return await response.json();
}

export async function Authentication({email, password}: {email: string, password: string})
{
    const response = await fetch('/api/authenticate', {
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