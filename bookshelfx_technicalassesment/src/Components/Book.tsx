export interface Book {
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
    image: string;
    title: string;
    description: string;
    rating: number;
    onLearnMore?: () => void;
}

