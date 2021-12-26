import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-info',
  templateUrl: './dialog-info.component.html',
  styleUrls: ['./dialog-info.component.scss']
})
export class DialogInfoComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<DialogInfoComponent>) { }

  ngOnInit(): void {
  }

  onClose(){
    this.dialogRef.close()
  }

}
