import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { BooksTableComponent } from './books-table/books-table.component';




const routes: Routes = [
    {path: '', redirectTo: 'bookList', pathMatch: 'full' },
    {path: 'bookList', component: BooksTableComponent},
    {path: 'addBook', component: AddBookComponent},
    {path: 'update/:id', component: AddBookComponent,
},
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}