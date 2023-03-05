import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgConfirmService } from 'ng-confirm-box';
import { Observable, of } from 'rxjs';
import { AddBookComponent } from '../add-book/add-book.component';
import { BookDto, BookRequest } from '../models/dto';
import { BooksApiService } from './books-api.service';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  book!: BookRequest;
  public books!: BookDto[];
  bookId!: number;

  constructor(
    private booksApi: BooksApiService,
    private toastService: NgToastService,
    private dialogRef: MatDialogRef<AddBookComponent>,
    private confirm: NgConfirmService,
    private route: ActivatedRoute,
    private dialog: MatDialog
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
          this.booksApi.getBooks();
        });
      },
      () => of({})
    );
  }

  getParamId(): number {
    this.route.params.subscribe((params) => {
      this.bookId = params['id'];
    });
    return this.bookId;
  }

  updateBookData(id: number, bookDetails: BookDto) {
    this.booksApi.updateBook(id, bookDetails).subscribe({
      next: (res) => {
        if (res) bookDetails = res;
        this.toastService.success({
          detail: 'Success',
          summary: 'Książka zapisana pomyślnie',
          duration: 3000,
        });
      },
      error: () => {
        this.toastService.error({
          detail: 'Failed',
          summary: 'Książka nie została zapisana',
          duration: 3000,
        });
      },
    });
  }

  // getBooksData(){
  //   this.booksApi.getBooks()
  // }
}
