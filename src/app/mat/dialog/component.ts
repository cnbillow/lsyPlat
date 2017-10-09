import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { MdDialogRef, MD_DIALOG_DATA } from "@angular/material";
import { HttpService } from "../../tools/serve/serve.serve";
import { SnackService } from "../../tools/snack/index";
import { fuck } from "../../tools/url/index";
import { formModelClear } from "../../tools/clear/index";
import { Md5 } from "ts-md5/dist/md5";
import { TEST } from "../../tools/validators/index";
@Component({
    templateUrl: './component.html',
    encapsulation: ViewEncapsulation.None,
    styles: [
        `
        md-select {
            padding-top:0 !important;
        }
        .mat-select-placeholder {
            padding:0;
            font-size:14px;
        }
        .fn-hide {
            height: 0;
            opacity: 0;
            overflow: hidden;
        }
        `
    ]
})
export class DialogComponent {
    formModel: FormGroup;
    isAdd: boolean = true;
    roles: Array<any> = [];
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor( @Inject(MD_DIALOG_DATA) public data: any, private http: HttpService, private snackbar: SnackService, private dialogRef: MdDialogRef<DialogComponent>) {
        this.isAdd = !data.roleId;
        this.formModel = new FormGroup({
            id: new FormControl(data.id),
            username: new FormControl(data.username, [Validators.required]),
            password: new FormControl(''),
            roleId: new FormControl(data.roleId, [Validators.required]),
        })
        if (this.isAdd) {
            this.formModel.get('password').setValidators([Validators.required, TEST.passwordIject]);
        }
        this.getRoles();
    }
    getRoles() {
        this.http.ajax({ url: fuck.f._6, headers: [0, 1], type: 'post' }).subscribe(res => {
            this.roles = res;
        });

    }
    submit(e: Event) {
        e.preventDefault();
        this.formModel.value.password = Md5.hashStr(this.formModel.value.password);
        let model = formModelClear(this.formModel.value);
        let url = this.isAdd ? fuck.e._4 : fuck.e._5;
        this.http.ajax({ url: url, headers: [0, 1], type: 'post', data: model }).subscribe(res => {
            this.snackbar.success('操作成功');
            this.dialogRef.close(1);
        });

    }
}
