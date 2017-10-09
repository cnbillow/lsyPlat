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
            { k: 'amount', v: '发票金额' },
            { k: 'createTime', v: '发生时间' },
            { k: 'invoiceTitle', v: '发票抬头' },
            { k: 'taxNumber', v: '税号' },
            { k: 'invoiceQuality', v: '发票性质' },
            { k: 'sendMode', v: '发送方式' },
            { k: 'statusValues', v: '发票状态' },
            { k: 'remark', v: '发票备注' },
            { k: 'more', v: '' },
        ],
        dataSource: [],
        moreItems: [
            { k: 'edit', v: '编辑发票' },
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
                    case 'edit': this.edit(e.handleData.v['id']); break;
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
            this.dialog.open(DialogComponent, { data: res }).afterClosed().subscribe(k => {
                if (k == 1) {
                    this.DATA();
                }
            });
        });
    }
    edit(id) {
        this._hand(fuck.k._2, id);
    }
    pageInfo = {
        page: 1,//int	1	当前页码	是
        pageSize: 10,//int	10	每页大小	是
    };

    ngOnInit() {
        this.DATA();
    }
    exportState: boolean = false;
    export() {
        this.exportState = true;
        this.http.ajax({ url: fuck.k._5, headers: [0, 1], type: 'export' }).subscribe(res => {
            this.exportState = false;
            location.href = host + fuck.k._5 + "?access_token=" + sessionStorage.getItem('token');
        });
    }

    DATA() {
        this.http.ajax({ url: fuck.k._1, headers: [0, 1], type: 'post', data: this.pageInfo }).subscribe(res => {
            this.IN.dataSource = res.rows;
            this.IN.pageTotal = res.total;
        }, error => {
            this.IN.pageTotal = -1;
            this.IN.errorMsg = this.http.errorMsg;
        });
    }

}
