export interface Book {
    id?: number;
    ISBN: string;
    coverimage: string;
    title: string;
    authors: string[];
    availability: boolean;
    description: string;
    category: string;
    publisher: string;
    publishedDate: Date;
    pagecount: number;
    rating: number;
    customerReviews: string[];
}

export interface BookCardProps {
    id?: number;
    coverimage: string;
    title: string;
    description: string;
    authors: string[];
    rating?: number;
    availability?: boolean;
    onLearnMore?: () => void;
    onMouseEnter?: () => void;
    onClick?: () => void;
}

export interface ImageCardProps {
    image: string;
    title: string;
    rating: number;
    onMouseEnter?: () => void;
    onClick?: () => void;
}

export interface User {
    id?: number;
    email: string;
    name: string;
    role: string;
    password?: string; // password is optional as it is not required for all operations
}