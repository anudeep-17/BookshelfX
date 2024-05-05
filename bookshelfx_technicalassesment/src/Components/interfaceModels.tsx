export interface Book {
    ISBN: string;
    bookimage: string;
    title: string;
    description: string;
    rating: number;
    publisher: string;
    publishedDate: string;
    category: string;
    pageCount: number;
    customerReviews: string[];
}

export interface BookCardProps {
    id?: number;
    image: string;
    title: string;
    description: string;
    rating: number;
    onLearnMore?: () => void;
}

export interface ImageCardProps {
    image: string;
    title: string;
    rating: number;
}

export interface User {
    id?: number;
    email: string;
    name: string;
    role: string;
    password?: string; // password is optional as it is not required for all operations
}