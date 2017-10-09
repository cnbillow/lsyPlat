import { Component, OnInit } from '@angular/core';
import { _tableInput, _tableOut } from '../tools/interface/interface';
import { ConfirmService } from '../tools/confirm/confirm.serve';
import { HttpService } from '../tools/serve/serve.serve';
import { fuck } from '../tools/url/index';
import { MdDialog } from "@angular/material";
import { DialogComponent } from './dialog/component';
import { SnackService } from '../tools/snack/index';
import { FormGroup, FormControl } from "@angular/forms";
@Component({
    templateUrl: './component.html',
    styleUrls: ['./component.scss']
})
export class _Component implements OnInit {

    constructor(private confirm: ConfirmService, private http: HttpService, private dialog: MdDialog, private snackbar: SnackService) {

    }
    IN: _tableInput = {
        errorMsg: '',
        displayedColumns: [
            { k: 'operatorName', v: '操作人' },
            { k: 'operateTime', v: '时间' },
            { k: 'operateTypeValue', v: '操作类型' },
            { k: 'content', v: '操作日志' },
        ],
        dataSource: [],
        moreItems: [],
        rowCheckbox: false,
        rowRadio: false,
        pageTotal: undefined
    };
    formModel: FormGroup;
    OUT(e: _tableOut) {
        switch (e.type) {
            case 'page':
                {
                    this.pageInfo.page = e.pageInfo.pageIndex + 1;
                    this.pageInfo.pageSize = e.pageInfo.pageSize;
                    this.DATA();
                } break;
        }
    }
    pageInfo = {
        keyWord: undefined,
        page: 1,//int	1	当前页码	是
        pageSize: 10,//int	10	每页大小	是
    };

    ngOnInit() {
        this.DATA();
        this.formModel = new FormGroup({
            keyWord: new FormControl(undefined),
        })
    }
    search() {
        this.pageInfo.keyWord = this.formModel.value.keyWord || undefined;
        this.DATA();
    }
    DATA() {
        this.http.ajax({ url: fuck.l._1, headers: [0, 1], type: 'post', data: this.pageInfo }).subscribe(res => {
            this.IN.dataSource = res.rows;
            this.IN.pageTotal = res.total;
        }, error => {
            this.IN.pageTotal = -1;
            this.IN.errorMsg = this.http.errorMsg;
        });
    }

}
