import { MD_DIALOG_DATA, MdDialogRef } from "@angular/material";
import { Component, Inject } from "@angular/core";
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { fuck } from "../../tools/url/index";
import { HttpService } from "../../tools/serve/serve.serve";
import { SnackService } from "../../tools/snack/index";
import { formModelClear } from "../../tools/clear/index";
import { TEST } from "../../tools/validators/index";

@Component({
    templateUrl: './component.html',
})
export class DialogComponent {
    formModel: FormGroup;
    isAdd: boolean = true;
    constructor( @Inject(MD_DIALOG_DATA) public data: any, private dialogRef: MdDialogRef<DialogComponent>, private http: HttpService, private snackbar: SnackService) {
        console.log(data)
        this.isAdd = !data.id;
        let _valid = data.valid == true ? true : false;
        this.formModel = new FormGroup({
            id: new FormControl(data.id),
            accountName: new FormControl(data.accountName, [Validators.required, TEST.content]),
            accountNumber: new FormControl(data.accountNumber, [Validators.required, TEST.accoutCode]),
            bankName: new FormControl(data.bankName, [Validators.required, TEST.content]),
            valid: new FormControl(_valid, [Validators.required]),
        });
    }
    toggle(e) {
        this.formModel.get('valid').setValue(e.checked)
    }
    submit(e: Event) {
        e.preventDefault();
        let model = formModelClear(this.formModel.value);
        let url = this.isAdd ? fuck.i._a._1 : fuck.i._a._2;
        this.http.ajax({ url: url, headers: [0, 1], type: 'post', data: model }).subscribe(res => {
            this.snackbar.success('操作成功');
            this.dialogRef.close(1);
        });
    }
}