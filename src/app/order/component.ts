import { Component, OnInit } from '@angular/core';
import { _tableInput, _tableOut } from '../tools/interface/interface';
import { ConfirmService } from '../tools/confirm/confirm.serve';
import { HttpService } from '../tools/serve/serve.serve';
import { fuck, host } from '../tools/url/index';
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
            { k: 'number', v: '订单号' },
            { k: 'content', v: '产品' },
            { k: 'orderTypeValue', v: '类型' },
            { k: 'createTime', v: '创建时间' },
            { k: 'payTime', v: '支付/开通时间' },
            { k: 'orderStatusValue', v: '状态' },
            { k: 'originalAmount', v: '原价' },
            { k: 'actualAmount', v: '应付金额' },
            { k: 'more', v: '' },
        ],
        dataSource: [],
        moreItems: [
            { k: 'see', v: '查看详情' }
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
    _hand(url, id) {
        this.http.ajax({ url: url, headers: [0, 1], type: 'post', data: { orderId: id } }).subscribe(res => {
            this.dialog.open(DialogComponent, { data: res });
        });
    }
    see(id) {
        this._hand(fuck.g._2, id);
    }
    pageInfo = {
        page: 1,//int	1	当前页码	是
        pageSize: 10,//int	10	每页大小	是
    };

    ngOnInit() {
        this.DATA();
        this.formModel = new FormGroup({
            keyWord: new FormControl(undefined),
        })
    }
    exportState: boolean = false;
    export() {
        this.exportState = true;
        this.http.ajax({ url: fuck.g._3, headers: [0, 1], type: 'export' }).subscribe(res => {
            this.exportState = false;
            location.href = host + fuck.g._3 + "?access_token=" + sessionStorage.getItem('token');
        });
    }
    DATA() {
        this.http.ajax({ url: fuck.g._1, headers: [0, 1], type: 'post', data: this.pageInfo }).subscribe(res => {
            this.IN.dataSource = res.rows;
            this.IN.pageTotal = res.total;
        }, error => {
            this.IN.pageTotal = -1;
            this.IN.errorMsg = this.http.errorMsg;
        });
    }

}
