import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LiteraryGenre } from '../dictionary';
import { BookDto } from '../models/dto';
import { BooksApiService } from '../services/books-api.service';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
})
export class AddBookComponent implements OnInit {
  readonly literaryGenre: LiteraryGenre[] = [
    { key: 'novella', value: 'Nowela' },
    { key: 'shortStory', value: 'Opowiadanie' },
    { key: 'fairyTale', value: 'Bajka' },
    { key: 'ballad', value: 'Ballada' },
    { key: 'fantasy', value: 'Fantasy' },
  ];

  form!: FormGroup;
  bookId!: number;
  mode!: string;
  constructor(
    private fb: FormBuilder,
    private booksService: BooksService,
    private router: Router,
    private booksApiService: BooksApiService,

    @Inject(MAT_DIALOG_DATA)
    public data: {
      id: number;
      mode: string;
    },
    private dialogRef: MatDialogRef<AddBookComponent>
  ) {}

  ngOnInit(): void {
    this.editOrAddMode();
  }

  onSubmitForm(): void {
    if (this.form.valid) {
      this.booksService.saveBookData(this.form.value);
      this.closeDialog();
    }
  }
  closeDialog(): void {
    this.dialogRef.afterClosed().subscribe((resp) => {
      this.booksApiService.getBooks();
    });
    this.router.navigate(['/bookList']);
    this.dialogRef.close();
  }

  createForm() {
    this.form = this.fb.group({
      isbnNumber: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      numberOfPages: new FormControl('', Validators.required),
      releaseDate: new FormControl('', Validators.required),
      genre: new FormControl('', Validators.required),
    });
  }

  fetchDataFromResponse(id: number) {
    if(id != undefined){
      this.booksApiService.getBook(id).subscribe((resp) => {
        this.form.patchValue(resp);
      });
    }

  }

  updateBookData() {
    this.booksService.updateBookData(this.data.id, this.form.value);
    this.closeDialog();
  }

  editOrAddMode() {
    if (this.data.id == undefined && this.mode === 'add') {
      this.createForm();
    } else {
      this.createForm();
      this.fetchDataFromResponse(this.data.id);
    }
  }
}
