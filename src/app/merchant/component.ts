import { Component, OnInit, ViewChild } from '@angular/core';
import { _tableInput, _tableOut } from '../tools/interface/interface';
import { ConfirmService } from '../tools/confirm/confirm.serve';
import { HttpService } from '../tools/serve/serve.serve';
import { fuck } from '../tools/url/index';
import { MdDialog } from "@angular/material";
import { DialogComponent } from './dialog/component';
import { SnackService } from '../tools/snack/index';
import { FormGroup, FormControl } from "@angular/forms";
import { extend, formModelClear } from '../tools/clear/index';
import { host } from '../tools/url/index';
@Component({
    templateUrl: './component.html',
    styleUrls: ['./component.scss']
})
export class _Component implements OnInit {

    listIds: Array<number> = [];
    constructor(private confirm: ConfirmService, private http: HttpService, private dialog: MdDialog, private snackbar: SnackService) {

    }
    tableReset: boolean = false;
    IN: _tableInput = {
        errorMsg: '',
        displayedColumns: [
            { k: 'checkbox', v: '' },
            { k: 'companyName', v: '公司名称' },
            { k: 'endTime', v: '到期时间' },
            { k: 'name', v: '姓名' },
            { k: 'phone', v: '联系电话' },
            { k: 'categoryName', v: '行业' },
            { k: 'agencyNumber', v: '经销商数量' },
            { k: 'createTime', v: '注册日期' },
            { k: 'comboName', v: '账户套餐' },
            { k: 'valid', v: '状态' },
            { k: 'more', v: '' },
        ],
        dataSource: [],
        moreItems: [{
            k: 'stop', v: '停用'
        }, {
            k: 'open', v: '启用'
        }],
        rowCheckbox: true,
        rowRadio: false,
        pageTotal: undefined
    };
    valids = [
        { k: '', v: '--状态--' },
        { k: true, v: '启用' },
        { k: false, v: '停用' },
    ]
    formModel: FormGroup;
    OUT(e: _tableOut) {
        switch (e.type) {
            case 'more': {
                switch (e.handleData.k) {
                    case 'stop': this.hand(false, [+e.handleData.v['id']]); break;
                    case 'open': this.hand(true, [+e.handleData.v['id']]); break;
                }
            } break;
            case 'checkbox': {
                this.listIds = e.checkBoxList
            } break;
            case 'page':
                {
                    this.pageInfo.page = e.pageInfo.pageIndex + 1;
                    this.pageInfo.pageSize = e.pageInfo.pageSize;
                    this.DATA();
                } break;
        }
    }
    hand(state, id?) {
        let url = state ? fuck.a._3 : fuck.a._2;
        this.http.ajax({ url: url, headers: [0, 2], type: 'post_array', arrayData: id || this.listIds }).subscribe(res => {
            this.snackbar.success('操作成功');
            this.DATA();
        });
    }
    pageInfo = {
        startTime: undefined,
        endTime: undefined,
        cstartTime: undefined,
        cendTime: undefined,
        valid: undefined,
        keyWord: undefined,

        page: 1,//int	1	当前页码	是
        pageSize: 10,//int	10	每页大小	是
    };

    ngOnInit() {
        this.DATA();
        this.formModel = new FormGroup({
            valid: new FormControl(''),
            keyWord: new FormControl(undefined),
        })
    }
    search() {

        for (let item of Object.keys(this.pageInfo)) {
            if (item != 'page' && item != 'pageSize') {
                this.pageInfo[item] = undefined;
            }
        }

        this.pageInfo.valid = this.formModel.value.valid;
        this.pageInfo.keyWord = this.formModel.value.keyWord;

        this.DATA();
    }
    highSearch() {
        let model = extend(this.pageInfo, this.formModel.value);
        this.dialog.open(DialogComponent, { data: model }).afterClosed().subscribe(model => {
            if (model) {
                this.pageInfo = extend(this.pageInfo, model);
                for (let item of Object.keys(this.formModel.value)) {
                    this.formModel.get(item).setValue(model[item])
                }
                this.DATA();
            }
        });
    }
    exportState: boolean = false;
    export() {
        this.exportState = true;
        this.http.ajax({ url: fuck.a._4, headers: [0, 1], type: 'export' }).subscribe(res => {
            this.exportState = false;
            location.href = host + fuck.a._4 + "?access_token=" + sessionStorage.getItem('token');
        });
    }
    DATA() {
        let model = formModelClear(this.pageInfo);
        this.http.ajax({ url: fuck.a._1, headers: [0, 1], type: 'post', data: model }).subscribe(res => {
            res.rows.map(item => item.valid = item.valid == true ? '启用' : '停用');
            this.IN.dataSource = res.rows;
            this.IN.pageTotal = res.total;
            this.tableReset = !this.tableReset;
        }, error => {
            this.IN.pageTotal = -1;
            this.IN.errorMsg = this.http.errorMsg;
        });
    }

}
