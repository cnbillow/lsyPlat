import {
  Component,
  Inject
} from '@angular/core';
import {
  MD_DIALOG_DATA,
  MdDialogRef,
  MdDialog
} from "@angular/material";

@Component({
  template: `<div><h2 md-dialog-title>{{data.title}}</h2>
    <md-dialog-content>{{data.content}}</md-dialog-content>
    <md-dialog-actions>
      <button md-button md-dialog-close>取消</button>
      <button md-button md-raised-button [color]="data.type =='delete'?'warn':'primary'" (click)="yes()">确定</button>
    </md-dialog-actions></div>
    `,
  styles: ["md-spinner {height:50px;width:53px;margin-bottom:10px}"]
})

export class ConfirmComponent {
  constructor(private dialog: MdDialog, private dialogRef: MdDialogRef<ConfirmComponent>, @Inject(MD_DIALOG_DATA) public data: any) { }
  close(k) {
    this.dialogRef.close(k);
    if (this.data.colseAll) {
      this.dialog.closeAll();
    }
  }
  yes() {
    //一些弹窗关闭前的操作。获取关闭许可.
    this.close(1)
  }
}
