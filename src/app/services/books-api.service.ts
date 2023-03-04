import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookDto, BookRequest } from '../models/dto';

@Injectable({
  providedIn: 'root',
})
export class BooksApiService {
  constructor(private http: HttpClient) {}

  // chciałam dostac sie do statusCode i zrobic observe: "response" ale mam problem z typem"
  addBook(data: BookRequest){
    return this.http
      .post<BookDto>('http://localhost:3000/book', data)

  }

  getBooks(): Observable<BookDto[]> {
  return  this.http.get<BookDto[]>('http://localhost:3000/book')
  }

  deleteBook(id: number): Observable<BookDto>{
    return this.http.delete<BookDto>(`http://localhost:3000/book/${id}`)
  }
}
