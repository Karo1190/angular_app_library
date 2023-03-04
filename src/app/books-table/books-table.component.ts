import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgToastService } from 'ng-angular-popup';
import { NgConfirmService } from 'ng-confirm-box';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { BookDto } from '../models/dto';
import { BooksApiService } from '../services/books-api.service';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-books-table',
  templateUrl: './books-table.component.html',
  styleUrls: ['./books-table.component.scss'],
})
export class BooksTableComponent implements OnInit {
  dataSource!: MatTableDataSource<BookDto>
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
    private booksService: BooksService,
    private confirm: NgConfirmService,
    private toast: NgToastService
  ) {}

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

//przy próbie zaimplemnetowania metody z serwisu i jej wywwołania w komponencie znowu mam proble z aktualizacja widoku
  // deleteBook(id: number){
  //   this.booksService.deleteBook(id);
  //   this.getBooks()
  // }


  editBook(id:number){

  }

}
