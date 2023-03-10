import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
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

  getBook(id: number): Observable<BookDto>{
    return this.http.get<BookDto>(`http://localhost:3000/book/${id}`)
  }

  updateBook(id: number, bookDetails: BookDto){
    return this.http.put<BookDto>(`http://localhost:3000/book/${id}`, bookDetails)
  //   .subscribe((resp=>{
  //     if(resp.status == 200){
  //      resp.body
  //     }
  //     else {
  //       return of({})
  //     }
  //   }))
  // }
}
}
