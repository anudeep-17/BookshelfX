export async function getBook()
{
    const response = await fetch('/api/books/getBooks');
    const data = await response.json();
    return data;
}

export async function getCategories()
{
    const response = await fetch('/api/books/getCategories');
    const data = await response.json();
    return data;
}