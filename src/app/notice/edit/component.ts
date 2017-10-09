import { Component, Inject, OnDestroy, ViewEncapsulation, AfterViewInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { formModelClear } from "../../tools/clear/index";
import { MdDialogRef, MD_DIALOG_DATA } from "@angular/material";
import { HttpService } from "../../tools/serve/serve.serve";
import { SnackService } from "../../tools/snack/index";
import { fuck } from "../../tools/url/index";
import { TEST } from "../../tools/validators/index";
@Component({
    templateUrl: './component.html',
    encapsulation: ViewEncapsulation.None,
    styles: [`
    .mat-dialog-content{
        overflow: auto !important;
        max-height: 80vh;
    }
    .ued-width {
        display: block;
        textarea {
          animation-duration: 2s;
        }
      }
      #openEditor {
        display: none;
      }
      .body-content {
        padding: 16px;
        width: 70vw;
      }
      .mat-dialog-container {
        padding: 0px 25px 25px 25px;
      }
      .mat-slide-toggle {
        margin-top: 10px;
      }
      .mat-select {
          padding-top:0
      }
      .footnav {
        display: flex;
      }
    `]
})
export class EditDialogComponent implements OnDestroy, AfterViewInit {
    ngAfterViewInit(): void {
        setTimeout(() => {
            this.editor();
        }, 150)
    }
    ueEditor: any;
    editorContent: any;
    isAdd: boolean = true;
    formModel: FormGroup;
    types: Array<any> = [];
    constructor( @Inject(MD_DIALOG_DATA) public data: any, private http: HttpService, private snackbar: SnackService, private dialogRef: MdDialogRef<EditDialogComponent>) {
        this.isAdd = !data.id;
        let _status = data.status == true ? true : false;
        this.formModel = new FormGroup({
            id: new FormControl(data.id),
            title: new FormControl(data.title, [Validators.required, TEST.content]),
            noticeTypeId: new FormControl(data.noticeTypeId, [Validators.required]),
            content: new FormControl(data.content),
            status: new FormControl(_status, [Validators.required]),
        });
        this.editorContent = data.content;
        this.getTypes();
        window['UEDITOR_CONFIG'] && (window['UEDITOR_CONFIG']['serverUrl'] = "http://cd.ydhl.com/plat/plat/ueditor/config?access_token=" + sessionStorage.getItem("token"));
    }
    ngOnDestroy(): void {
        this.ueEditor && this.ueEditor.destroy();
    }
    toggleChange(e) {
        this.formModel.get('status').setValue(e.checked);
    }
    getTypes() {
        this.http.ajax({ url: fuck.h._8, headers: [0, 1], type: 'post' }).subscribe(res => {
            this.types = res;
        });
    }
    submit(e: Event) {
        e.preventDefault();
        this.formModel.get('content').setValue(this.ueEditor.getContent());
        if (!this.formModel.value.content.trim()) {
            this.snackbar.error('请在富文本编辑器中编入正文内容！');
            return false;
        }
        let model = formModelClear(this.formModel.value);
        let url = this.isAdd ? fuck.h._1 : fuck.h._4;
        this.http.ajax({ url: url, headers: [0, 1], type: 'post', data: model }).subscribe(res => {
            this.snackbar.success('操作成功');
            this.dialogRef.close(1);
        });

    }
    editor() {
        let timer = setInterval(() => {
            var a = document.getElementById('myEditor');
            var ue = window['UE'];
            if (a && ue) {
                clearInterval(timer);
                let _h = ~~(window.innerHeight * 0.8 - 380);
                this.ueEditor = ue.getEditor('myEditor', { initialFrameHeight: _h });
                setTimeout(() => {
                    document.getElementById('openEditor').style.display = "block";
                }, 800)
            }
        }, 100);
        setTimeout(() => {
            timer && clearInterval(timer);
        }, 10000)
    }

} 