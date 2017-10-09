import { Component, Inject } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { MdDialogRef, MD_DIALOG_DATA } from "@angular/material";
import { HttpService } from "../../tools/serve/serve.serve";
import { SnackService } from "../../tools/snack/index";
import { fuck } from "../../tools/url/index";
import { formModelClear } from "../../tools/clear/index";
@Component({
    templateUrl: './component.html'
})
export class DialogComponent {
    formModel: FormGroup;
    valids = [
        { k: '', v: '--状态--' },
        { k: true, v: '启用' },
        { k: false, v: '停用' },
    ]
    dateInit1 = { stime: undefined, etime: undefined };
    dateInit2 = { stime: undefined, etime: undefined };
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor( @Inject(MD_DIALOG_DATA) public data: any, private http: HttpService, private snackbar: SnackService, private dialogRef: MdDialogRef<DialogComponent>) {


        this.dateInit1 = {
            stime: data.startTime && data.startTime.split(" ")[0], etime: data.endTime && data.endTime.split(" ")[0]
        }
        this.dateInit2 = {
            stime: data.cstartTime && data.cstartTime.split(" ")[0], etime: data.cendTime && data.cendTime.split(" ")[0]
        }
        this.formModel = new FormGroup({
            startTime: new FormControl(data.startTime),
            endTime: new FormControl(data.endTime),
            cstartTime: new FormControl(data.cstartTime),
            cendTime: new FormControl(data.cendTime),
            valid: new FormControl(data.valid),
            keyWord: new FormControl(data.keyWord),
        })
    }

    toggle(e) {
        this.formModel.get('valid').setValue(e.checked)
    }
    submit(e: Event) {
        e.preventDefault();
        this.dialogRef.close(this.formModel.value);
    }
    undo() {
        this.dateInit1 = { stime: undefined, etime: undefined };
        this.dateInit2 = { stime: undefined, etime: undefined };
        for (let item of Object.keys(this.formModel.value)) {
            this.formModel.get(item).setValue(undefined);
        }
    }
    dateChange(e, num) {
        if (num == 1) {
            this.formModel.get('startTime').setValue(e.stime);
            this.formModel.get('endTime').setValue(e.etime);
        } else if (num == 2) {
            this.formModel.get('cstartTime').setValue(e.stime);
            this.formModel.get('cendTime').setValue(e.etime);
        }
    }
}
