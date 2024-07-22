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
    isFeaturedBook: boolean;
}

export interface BookDetails {
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
    isFeaturedBook: boolean;
    rentals : BookRentalDetails[];
    reviews : BookReview[];
    favoritedBy? : FavoriteBook[];
}

export interface User {
    id?: number;
    email: string;
    name: string;
    role: string;
    password?: string; 
    Avatar? : string;
    favoriteCategories?: string[];
}

export interface BookRentalDetails {
    id: number;
    bookId: number;
    userId: number;
    rentalDate: string;
    expectedReturnDate: string;
    returnDate?: string;
    userInitiatedReturn: boolean;
    returned: boolean;
    isOverdue: boolean;
    librarianId?: number;
    createdAt: string;
    updatedAt: string;
    book: Book;
    user?: User;
    librarian?: User;
}

export interface BookReview {
    bookId: number;
    userId: number;
    review: string;
    rating: number;
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
    availability: boolean;
    onLearnMore?: () => void;
    onMouseEnter?: () => void;
    onClick?: () => void;
}

export interface ImageCardProps {
    image: string;
    title: string;
    rating: number;
    availability: boolean;
    onMouseEnter?: () => void;
    onClick?: () => void;
}
