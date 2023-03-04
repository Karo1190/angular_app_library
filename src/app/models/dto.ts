import { LiteraryGenre } from "../dictionary";

export interface BookDto{
    id: number;
    isbnNumber: number;
    title: string;
    author: string;
    numberOfPages: number;
    genre: LiteraryGenre[];
    releaseDate: Date

}

export interface BookRequest {
    isbnNumber: number;
    title: string;
    author: string;
    numberOfPages: number;
    genre: LiteraryGenre[];
    releaseDate: Date
}

export interface BookResponse {
    id: number;
}