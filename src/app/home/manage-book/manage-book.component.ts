import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from 'src/app/core/interfaces/book';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-manage-book',
  templateUrl: './manage-book.component.html',
  styleUrls: ['./manage-book.component.css']
})
export class ManageBookComponent implements OnInit {

  bookForm: any;
  data: any;
  constructor(private fb: FormBuilder,
              private httpService : HttpService,
              private dialog: MatDialogRef<ManageBookComponent>,
              @Inject(MAT_DIALOG_DATA) data: any) {
                this.data = data;
              }

  ngOnInit(): void {
    console.log(this.data)
    this.bookForm = this.fb.group({
      isbn: ['', Validators.required],
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      paginas: ['', Validators.required],
      editorial: ['', Validators.required]
    });

    if(this.data.isEdit){
      this.bookForm.patchValue({
        isbn: this.data.book.isbn,
        titulo: this.data.book.titulo,
        autor: this.data.book.autor,
        paginas: this.data.book.paginas,
        editorial: this.data.book.editorial
      });
    }

  }

  manage(){
        const book  = {} as Book;
        book.autor = this.bookForm.get('autor').value;
        book.titulo = this.bookForm.get('titulo').value;
        book.isbn = this.bookForm.get('isbn').value;
        book.paginas = this.bookForm.get('paginas').value;
        book.editorial = this.bookForm.get('editorial').value;
        //Spinner

        if(this.data.isEdit){
          this.httpService.put('', '/v1/libro/' + this.data.book.id, book)
          .subscribe({
            complete: () => {
              /*spinner console.log('terminó')*/
              this.dialog.close(true);
            },
          });
        }else{
          this.httpService.post('', '/v1/libro', book)
          .subscribe({
            complete: () => {
              /*spinner console.log('terminó')*/
              this.dialog.close(true);
            },
          });
        }

  }
}
