import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { AddBookComponent } from '../add-book/add-book.component';
import { BooksTableComponent } from '../books-table/books-table.component';
import { BookDto } from '../models/dto';
import { BooksApiService } from '../services/books-api.service';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild(BooksTableComponent) templateTable!: BooksTableComponent;
  constructor(
    private dialog: MatDialog,
    private booksApi: BooksApiService
  ) {}

  ngOnInit(): void {}

  openAddBookDialog() {
this.dialog.open(AddBookComponent,  {
  data: {
    mode: 'add'
  },
});
  }
}
