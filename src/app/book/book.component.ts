import { Component } from '@angular/core';
import { Book } from '../models/book.model';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})

export class BookComponent implements OnInit {
  newBookTitle: string = '';
  newAuthorName: string = ''
  notReadBooks: Book[] = [];
  wasRead: boolean = false;
  wereRead: Book[] = [];

  ngOnInit(): void {
    let savedNotReadBooks = localStorage.getItem("notReadBooks");
    this.notReadBooks = savedNotReadBooks ? JSON.parse(savedNotReadBooks) : [];
    let savedWereRead = localStorage.getItem("wereRead");
    this.wereRead = savedWereRead ? JSON.parse(savedWereRead) : [];
  };

  addBook() {
    if (this.newAuthorName.trim().length && this.newBookTitle.trim().length) {
      let newBook: Book = {
        id: Date.now(),
        title: this.newBookTitle,
        author: this.newAuthorName
      };

      if (this.wasRead) {
        this.wereRead.push(newBook);
      } else {
        this.notReadBooks.push(newBook);
      }

      this.newAuthorName = "";
      this.newBookTitle = "";
      this.wasRead = false;

      localStorage.setItem("notReadBooks", JSON.stringify(this.notReadBooks));
      localStorage.setItem("wereRead", JSON.stringify(this.wereRead))
    };
  };



  deleteBook(id: number, array:Book[], element: string) { 
    let index = array.findIndex(book => book.id === id);
    array.splice(index, 1);
    localStorage.setItem(element, JSON.stringify(array))
  }
}
