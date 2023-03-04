import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { NgConfirmService } from 'ng-confirm-box';
import { Observable } from 'rxjs';
import { AddBookComponent } from '../add-book/add-book.component';
import { BookDto, BookRequest } from '../models/dto';
import { BooksApiService } from './books-api.service';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  book!: BookRequest;
  public books!: BookDto[];

  constructor(
    private booksApi: BooksApiService,
    private toastService: NgToastService,
    private dialogRef: MatDialogRef<AddBookComponent>,
    private confirm: NgConfirmService,
  ) {}

  saveBookData(data: BookRequest) {
    this.book = {
      isbnNumber: data.isbnNumber,
      title: data.title,
      author: data.author,
      numberOfPages: data.numberOfPages,
      genre: data.genre,
      releaseDate: data.releaseDate,
    };
    this.booksApi.addBook(this.book).subscribe({
      next: (res) => {
        if (res.id)
          this.toastService.success({
            detail: 'Success',
            summary: 'Książka dodana pomyślnie',
            duration: 3000,
          });
        // this.dialogRef.close() nie działa nie wiem czemu
      },
      error: () => {
        this.toastService.error({
          detail: 'Failed',
          summary: 'Książka nie została dodana',
          duration: 3000,
        });
      },
    });
  }
// getBooksData():Observable<BookDto[]> {
//   return this.booksApi.getBooks()
// }

// delete(id: number){
// this.confirm.
// }

deleteBook(id: number) {
  this.confirm.showConfirm(
    'Czy na pewno chcesz usunąć książkę?',
    () => {
      this.booksApi.deleteBook(id).subscribe((res) => {
        this.toastService.success({
          detail: 'Success',
          summary: 'Książka została usunięta',
          duration: 3000,
        });
        this.getBooks();
      });
    },
    () => {}
  );
}

getBooks(){
  return this.booksApi.getBooks()
}

}
