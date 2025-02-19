import { Component, Type } from '@angular/core';
import { Book, Status} from '../models/book.model';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {  

  private readonly storageName = "Books"
  newBookTitle: string = '';
  newAuthorName: string = '';
  newStatus: Status  = "unread";
  newUpStatus: Status = "unread";
  newDateStatus: Date = new Date();
  books: Book[] = [];

  ngOnInit(): void {
    let savedBooks = localStorage.getItem(this.storageName);
    this.books = savedBooks ? JSON.parse(savedBooks) : [];
  };

  addBook(): void {
    if (this.newAuthorName.trim().length && this.newBookTitle.trim().length) {
      let newBook: Book = {
        id: Date.now(),
        title: this.newBookTitle,
        author: this.newAuthorName,
        status: this.newStatus,
        dateStatus: this.newDateStatus,
        upStatus: this.newStatus
      };

      this.books.unshift(newBook);
      this.newAuthorName = "";
      this.newBookTitle = "";
      this.newStatus = "unread";
      this.newDateStatus = new Date();

      localStorage.setItem(this.storageName, JSON.stringify(this.books));
    };
  };

  updateStatus(id: number, updatingStatusValue: Status | "delete"){
    let index = this.books.findIndex(book => book.id === id);

    if(updatingStatusValue === "delete"){
      this.books.splice(index, 1);
    } else {
      this.books[index].dateStatus = new Date();
      this.books[index].status = updatingStatusValue;
    }
    localStorage.setItem(this.storageName, JSON.stringify(this.books));
  }

  deleteBook(id:number) {
    let index = this.books.findIndex(book => book.id === id);
    this.books.splice(index, 1);
    localStorage.setItem(this.storageName, JSON.stringify(this.books))
  }
}