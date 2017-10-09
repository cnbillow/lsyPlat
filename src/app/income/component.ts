import { Component, OnInit } from '@angular/core';
import { _tableInput, _tableOut } from '../tools/interface/interface';
import { ConfirmService } from '../tools/confirm/confirm.serve';
import { HttpService } from '../tools/serve/serve.serve';
import { fuck, host } from '../tools/url/index';
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
    incomeAmount = {
        other: "",   //其他收入
        charge: ""  //充值收入 
    }
    IN: _tableInput = {
        errorMsg: '',
        displayedColumns: [
            { k: 'sourceTxn', v: '流水号' },
            { k: 'payTime', v: '支付时间' },
            { k: 'merchantsCompanyName', v: '客户名称' },
            { k: 'payTypeValues', v: '支付方式' },
            { k: 'amount', v: '金额' },
            { k: 'account', v: '收款账户' },
            { k: 'remark', v: '摘要' },
            { k: 'more', v: '' },
        ],
        dataSource: [],
        moreItems: [
            { k: 'see', v: '查看详情' },
        ],
        rowCheckbox: false,
        rowRadio: false,
        pageTotal: undefined
    };
    formModel: FormGroup;
    OUT(e: _tableOut) {
        switch (e.type) {
            case 'more': {
                switch (e.handleData.k) {
                    case 'see': this.see(e.handleData.v['id']); break;
                }
            } break;

            case 'page':
                {
                    this.pageInfo.page = e.pageInfo.pageIndex + 1;
                    this.pageInfo.pageSize = e.pageInfo.pageSize;
                    this.DATA();
                } break;
        }
    }
    _hand(url, id, type?) {
        this.http.ajax({ url: url, headers: [0, 1], type: 'post', data: { id: id } }).subscribe(res => {
            if (type == 'see') {
                this.dialog.open(DialogComponent, { data: res });
            }
        });
    }
    see(id) {
        this._hand(fuck.c._2, id, 'see');
    }
    pageInfo = {
        startTime: undefined,
        endTime: undefined,
        keyWord: undefined,
        page: 1,//int	1	当前页码	是
        pageSize: 10,//int	10	每页大小	是
    };
    dateChange(e) {
        this.formModel.get('startTime').setValue(e.stime);
        this.formModel.get('endTime').setValue(e.etime);
    }
    ngOnInit() {
        this.DATA();
        this.getIncomeAmount();
        this.formModel = new FormGroup({
            startTime: new FormControl(undefined),
            endTime: new FormControl(undefined),
            keyWord: new FormControl(undefined),
        })
    }
    search() {
        this.pageInfo.startTime = this.formModel.value.startTime;
        this.pageInfo.endTime = this.formModel.value.endTime;
        this.pageInfo.keyWord = this.formModel.value.keyWord;
        this.DATA();
    }
    exportState: boolean = false;
    export() {
        this.exportState = true;
        this.http.ajax({ url: fuck.c._4, headers: [0, 1], type: 'export' }).subscribe(res => {
            this.exportState = false;
            location.href = host + fuck.c._4 + "?access_token=" + sessionStorage.getItem('token');
        });
    }
    getIncomeAmount() {
        this.http.ajax({ url: fuck.c._3, headers: [0, 1], type: 'post' }).subscribe(res => {
            this.incomeAmount = res;
        });
    }
    DATA() {
        let model = formModelClear(this.pageInfo);
        this.http.ajax({ url: fuck.c._1, headers: [0, 1], type: 'post', data: model }).subscribe(res => {
            this.IN.dataSource = res.rows;
            this.IN.pageTotal = res.total;
        }, error => {
            this.IN.pageTotal = -1;
            this.IN.errorMsg = this.http.errorMsg;
        });
    }

}
