import { Component, Inject } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { MdDialogRef, MD_DIALOG_DATA } from "@angular/material";
import { HttpService } from "../../tools/serve/serve.serve";
import { SnackService } from "../../tools/snack/index";
import { fuck } from "../../tools/url/index";
import { formModelClear } from "../../tools/clear/index";
@Component({
    templateUrl: './component.html',
    styles: [
        `md-select {padding-top:0}`
    ]
})
export class DialogComponent {
    formModel: FormGroup;
    status: Array<any> = [];
    sendMode: Array<any> = ['快递', '人工'];
    logisticsCompany: Array<any> = ['顺丰', '圆通', '中通', '韵达', '速尔', '全峰', '天天快递', 'EMS'];
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor( @Inject(MD_DIALOG_DATA) public data: any, private http: HttpService, private snackbar: SnackService, private dialogRef: MdDialogRef<DialogComponent>) {
        this.getStatus();
        this.formModel = new FormGroup({
            id: new FormControl(data.id, [Validators.required]),
            status: new FormControl(data.status, [Validators.required]),
            sendMode: new FormControl(data.sendMode, [Validators.required]),
            logisticsCompany: new FormControl(data.logisticsCompany),
            trackingNumber: new FormControl(data.trackingNumber),
        })
    }
    getStatus() {
        this.http.ajax({ url: fuck.k._4, headers: [0, 1], type: 'post' }).subscribe(res => {
            let array = []
            Object.keys(res).map(item => {
                array.push({ k: res[item], v: item });
            })
            this.status = array;
        });
    }
    submit(e: Event) {
        e.preventDefault();
        let model = formModelClear(this.formModel.value);
        this.http.ajax({ url: fuck.k._3, headers: [0, 1], type: 'post', data: model }).subscribe(res => {
            this.snackbar.success('操作成功');
            this.dialogRef.close(1);
        });
    }
}
