import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/core/interfaces/book';
import { HttpService } from 'src/app/core/services/http.service';
import { MatDialog } from '@angular/material/dialog';
import { ManageBookComponent } from '../manage-book/manage-book.component';


@Component({
  selector: 'app-view-books',
  templateUrl: './view-books.component.html',
  styleUrls: ['./view-books.component.css']
})
export class ViewBooksComponent implements OnInit {

  books : Book[] = [];

  constructor(private httpService : HttpService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    //Spinner
    this.httpService.get('', '/v1/libro')
    .subscribe({
      complete: () => {/*spinner console.log('terminó')*/},
      next: data => this.books = data
    });
  }

  delete(book: Book){
    //confirmationModal
    this.httpService.delete('', '/v1/libro/' + book.id)
    .subscribe({
      complete: () => {/*spinner console.log('terminó')*/},
      next: data => this.books = data
    });
  }

  async manage(band: boolean, book?: Book){
    const dialogRef = this.dialog.open(ManageBookComponent, {
      width: '250px',
      data: {
        isEdit: band,
        book: book
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getAll();
      }
    });
  }

}
