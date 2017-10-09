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
    styles: [
        `
        .roles-box {
            display: flex;
            align-items: flex-start;
            padding: 0 16px;
            font-size: 16px;
            margin: 1em 0;
            line-height: 2.5em;
        }
        md-checkbox {
            display:block;
        }
        `
    ]
})
export class DialogComponent {
    formModel: FormGroup;
    isAdd: boolean = true;
    listIds: Array<any> = [];
    constructor( @Inject(MD_DIALOG_DATA) public data: any, private dialogRef: MdDialogRef<DialogComponent>, private http: HttpService, private snackbar: SnackService) {
        this.getPrivilegeList();
        this.isAdd = !data.id;
        this.formModel = new FormGroup({
            id: new FormControl(data.id),
            name: new FormControl(data.name, [Validators.required, TEST.content]),
            privilegeIdList: new FormControl(data.privilegeIdList || [], [this.isEmptyarray])
        });
    }
    isEmptyarray(array: FormControl): any {
        if (Array.isArray(array.value)) {
            return array.value.length > 0 ? null : { array: true }
        } else {
            return { array: true }
        }
    }
    getPrivilegeList() {
        this.http.ajax({ url: fuck.f._7, headers: [0, 1], type: 'post' }).subscribe(res => {
            this.listIds = res;
        });
    }
    toggleIds(checked, id) {
        let list = this.formModel.get('privilegeIdList').value;
        if (checked) {
            list.push(+id);
            list.sort();
        } else {
            list.splice(list.indexOf(id), 1);
        }
        this.formModel.get('privilegeIdList').setValue(list);
    }
    defalutId(id) {
        return this.formModel.get('privilegeIdList').value.indexOf(id) !== -1;
    }
    submit(e: Event) {
        e.preventDefault();
        let model = formModelClear(this.formModel.value);
        model['privilegeIdList'] = model['privilegeIdList'].join();
        let url = this.isAdd ? fuck.f._2 : fuck.f._3;
        this.http.ajax({ url: url, headers: [0, 1], type: 'post', data: model }).subscribe(res => {
            this.snackbar.success('操作成功');
            this.dialogRef.close(1);
        });
    }
}