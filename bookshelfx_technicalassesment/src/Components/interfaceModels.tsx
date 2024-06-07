export interface Book {
    id?: number;
    ISBN: string;
    coverimage: string;
    title: string;
    authors: string[];
    description: string;
    availability: boolean;
    category: string;
    publisher: string;
    publishedDate: Date;
    pagecount: number;
    rating: number;
    createdAt?: Date;
    updatedAt?: Date;
    rentals?: BookRentalDetails[];
    reviews?: BookReview[];
    favoritedBy?: FavoriteBook[];
}

export interface User {
    id?: number;
    email: string;
    name: string;
    role: string;
    password?: string; 
    favouriteCategories?: string[];
    rentals?: BookRentalDetails[];
    authorizedRentals? : BookRentalDetails[];
    reviews? : BookReview[];
    favoriteBooks? : Book[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface BookRentalDetails
{
    id: number;
    bookId: number;
    userId: number;
    rentalDate: string;
    returnDate: string;
    returned: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    book: Book;  
}

export interface BookReview {
    bookId: number;
    userId: number;
    review: string;
    rating: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface FavoriteBook {
    userId: number;
    bookId: number;
}


//=======================================================Component Props=======================================================
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
