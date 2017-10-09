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
    enabled: boolean = false;
    isAdd: boolean = true;
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor( @Inject(MD_DIALOG_DATA) public data: any, private http: HttpService, private snackbar: SnackService, private dialogRef: MdDialogRef<DialogComponent>) {
        this.enabled = data.enabled == true ? true : false;
        this.isAdd = !data.id;
        this.formModel = new FormGroup({
            id: new FormControl(data.id),
            amount: new FormControl(data.amount, [Validators.required, Validators.min(0), Validators.max(1000000)]),
            agencyNumber: new FormControl(data.agencyNumber, [Validators.required, Validators.min(0), Validators.max(10000)]),
            name: new FormControl(data.name, [Validators.required]),
            enabled: new FormControl(this.enabled),
        })
    }

    toggle(e) {
        this.formModel.get('enabled').setValue(e.checked)
    }
    submit(e: Event) {
        e.preventDefault();
        let url = this.isAdd ? fuck.b._3 : fuck.b._4;
        let model = formModelClear(this.formModel.value);
        this.http.ajax({ url: url, headers: [0, 1], type: 'post', data: model }).subscribe(res => {
            this.snackbar.success('操作成功');
            this.dialogRef.close(1);
        });

    }

}
