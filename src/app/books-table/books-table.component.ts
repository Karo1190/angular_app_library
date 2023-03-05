import {
  AfterViewInit,
  Component,
  Inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgToastService } from 'ng-angular-popup';
import { NgConfirmService } from 'ng-confirm-box';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { AddBookComponent } from '../add-book/add-book.component';
import { BookDto } from '../models/dto';
import { BooksApiService } from '../services/books-api.service';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-books-table',
  templateUrl: './books-table.component.html',
  styleUrls: ['./books-table.component.scss'],
})
export class BooksTableComponent implements OnInit {
  dataSource!: MatTableDataSource<BookDto>;
  displayedColumns: string[] = [
    'id',
    'isbnNumber',
    'title',
    'author',
    'numberOfPages',
    'genre',
    'releaseDate',
    'action',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private booksApiService: BooksApiService,
    private confirm: NgConfirmService,
    private toast: NgToastService,
    private bookService: BooksService,
    private dialog: MatDialog
  ) {}
  showData: any;

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.booksApiService.getBooks().subscribe((resp) => {
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource);
    }),
      catchError((err) => {
        return of([]);
      });
  }

  deleteBook(id: number) {
    this.confirm.showConfirm(
      'Czy na pewno chcesz usunąć książkę?',
      () => {
        this.booksApiService.deleteBook(id).subscribe((res) => {
          this.toast.success({
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

  editBook(id: number): void {
    this.dialog.open(AddBookComponent, {
      data: {
        id: id,
        mode: 'edit'
      },
    });
  }
}
