import { Component, OnInit } from '@angular/core';
import { _tableInput, _tableOut } from '../tools/interface/interface';
import { ConfirmService } from '../tools/confirm/confirm.serve';
import { HttpService } from '../tools/serve/serve.serve';
import { fuck } from '../tools/url/index';
import { MdDialog } from "@angular/material";
import { DialogComponent } from './dialog/component';
import { SnackService } from '../tools/snack/index';
import { FormGroup, FormControl } from "@angular/forms";
import { formModelClear } from '../tools/clear/index';
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
            { k: 'merchantsName', v: '客户名称' },
            { k: 'easyUseLevel', v: '实用性' },
            { k: 'functionLevel', v: '功能性' },
            { k: 'stableLevel', v: '稳定性' },
            { k: 'content', v: '反馈内容' },
            { k: 'createTime', v: '日期' },
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
        startTime: undefined,
        endTime: undefined,
        keyWord: undefined,
        page: 1,//int	1	当前页码	是
        pageSize: 10,//int	10	每页大小	是
    };

    ngOnInit() {
        this.DATA();
        this.formModel = new FormGroup({
            startTime: new FormControl(undefined),
            endTime: new FormControl(undefined),
            keyWord: new FormControl(undefined),
        })
    }
    dateChange(e) {
        this.formModel.get('startTime').setValue(e.stime);
        this.formModel.get('endTime').setValue(e.etime);
    }
    search() {
        this.pageInfo.startTime = this.formModel.value.startTime;
        this.pageInfo.endTime = this.formModel.value.endTime;
        this.pageInfo.keyWord = this.formModel.value.keyWord;
        this.DATA();
    }
    DATA() {
        let model = formModelClear(this.pageInfo);
        this.http.ajax({ url: fuck.j._1, headers: [0, 1], type: 'post', data: model }).subscribe(res => {

            res.rows.map(item => {
                item.easyUseLevel = this.star(item.easyUseLevel);
                item.functionLevel = this.star(item.functionLevel);
                item.stableLevel = this.star(item.stableLevel);
            })

            this.IN.dataSource = res.rows;
            this.IN.pageTotal = res.total;
        }, error => {
            this.IN.pageTotal = -1;
            this.IN.errorMsg = this.http.errorMsg;
        });
    }
    star(num) {
        return "★★★★★☆☆☆☆☆".slice(5 - num, 10 - num)
    }
}
