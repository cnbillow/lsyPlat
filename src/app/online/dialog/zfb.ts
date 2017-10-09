import { Component, Inject } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { MdDialogRef, MD_DIALOG_DATA } from "@angular/material";
import { HttpService } from "../../tools/serve/serve.serve";
import { SnackService } from "../../tools/snack/index";
import { fuck } from "../../tools/url/index";

@Component({
    templateUrl: './zfb.html',
})
export class ZFBDialogComponent {
    formModel: FormGroup;
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor( @Inject(MD_DIALOG_DATA) public data: any, private http: HttpService, private snackbar: SnackService, private dialogRef: MdDialogRef<ZFBDialogComponent>) {
        let _valid = data.valid == true ? true : false;
        this.formModel = new FormGroup({
            account: new FormControl(data.account, [Validators.required]),
            partnerId: new FormControl(data.partnerId, [Validators.required]),
            securityKey: new FormControl(data.securityKey, [Validators.required]),
            valid: new FormControl(_valid, [Validators.required]),
        })
    }
    toggle(e) {
        this.formModel.get('valid').setValue(e.checked)
    }
    submit(e: Event) {
        e.preventDefault();
        this.http.ajax({ url: fuck.i._b._6, headers: [0, 1], type: 'post', data: this.formModel.value }).subscribe(res => {
            this.snackbar.success('操作成功');
            this.dialogRef.close(2);
        });
    }
}