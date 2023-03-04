import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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
  book!: BookDto;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddBookComponent>,
    private booksService: BooksService,
    private router: Router,
    private booksApiService: BooksApiService

  ) {}

  ngOnInit(): void {
   this.createForm();
  }

  onSubmitForm(): void {
    if (this.form.valid) {
      this.booksService.saveBookData(this.form.value);
      this.cancelAddBookDialog()
      this.router.navigate(['/home'])
    }
  }
  cancelAddBookDialog(): void {
    this.dialogRef.close();
  }

  createForm(){
    this.form = this.fb.group({
      isbnNumber: new FormControl('', Validators.required),
      title: new FormControl('',Validators.required),
      author: new FormControl('', Validators.required),
      numberOfPages: new FormControl('', Validators.required),
      releaseDate: new FormControl('', Validators.required),
      genre: new FormControl('', Validators.required),
    });
  }
}
