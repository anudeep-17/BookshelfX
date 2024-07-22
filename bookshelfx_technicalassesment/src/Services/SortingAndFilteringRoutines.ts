import { Book, BookDetails } from "@/Components/interfaceModels";

export function handleSort<T extends Book | BookDetails>({
    sortBy, 
    setBook, 
    books, 
    setCategory,
    allCategory,
    handleSortClose
}:
{
    sortBy: string,
    setBook?: (value: T[]) => void,
    books?: T[],
    setCategory?: (value: string[]) => void,
    allCategory?: string[],
    handleSortClose: () => void
})
{
    if(sortBy === 'title' && setBook && books)
    {
        setBook(sortBooksByTitle(books));
    }
    else if(sortBy === 'author' && setBook && books)
    {
        setBook(sortBooksByAuthor(books));
    }
    else if(sortBy === 'Category' && setCategory && allCategory)
    {
        setCategory(allCategory.sort());
    }
    handleSortClose();
}

export function slidervaluetext_forDays(value: number) {
    return `${value} days`;
}

export function sortBooksByTitle<T extends Book | BookDetails>(books: T[]) {
    return [...books].sort((a, b) => a.title.localeCompare(b.title));
}

export function sortBooksByAuthor<T extends Book | BookDetails>(books: T[]) {
    return [...books].sort((a, b) => {
        let comparison = 0;
        const maxAuthors = Math.max(a.authors.length, b.authors.length);

        for (let i = 0; i < maxAuthors; i++) {
            const authorA = a.authors[i] || '';
            const authorB = b.authors[i] || '';
            comparison = authorA.localeCompare(authorB);

            if (comparison !== 0) {
                // If the authors at the current index are not the same, break the loop
                break;
            }
        }

        return comparison;
    });
}