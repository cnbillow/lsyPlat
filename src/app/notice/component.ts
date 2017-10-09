import { Component, OnInit } from '@angular/core';
import { _tableInput, _tableOut } from '../tools/interface/interface';
import { ConfirmService } from '../tools/confirm/confirm.serve';
import { HttpService } from '../tools/serve/serve.serve';
import { fuck, host } from '../tools/url/index';
import { MdDialog } from "@angular/material";
import { SnackService } from '../tools/snack/index';
import { FormGroup, FormControl } from "@angular/forms";
import { formModelClear } from '../tools/clear/index';
import { SeeDialogComponent } from './see/component';
import { EditDialogComponent } from './edit/component';
@Component({
    templateUrl: './component.html',
    styleUrls: ['./component.scss']
})
export class _Component implements OnInit {

    constructor(private confirm: ConfirmService, private http: HttpService, private dialog: MdDialog, private snackbar: SnackService) {

    }
    listIds: Array<number> = [];
    status: Array<any> = [
        { k: true, v: '发布' },
        { k: false, v: '未发布' },
    ];
    types: Array<any> = [];
    tableReset: boolean = false;
    IN: _tableInput = {
        errorMsg: '',
        displayedColumns: [
            { k: 'checkbox', v: '' },
            { k: 'title', v: '通知标题' },
            { k: 'noticeTypeValue', v: '分类' },
            { k: 'createTime', v: '创建时间' },
            { k: 'lastPublishTime', v: '最后发布时间' },
            { k: 'createName', v: '创建人' },
            { k: 'status', v: '发布状态' },
            { k: 'more', v: '' },
        ],
        dataSource: [],
        moreItems: [
            { k: 'see', v: '详情' },
            { k: 'edit', v: '编辑' },
            { k: 'publish', v: '发布' },
            { k: 'delete', v: '删除' },
        ],
        rowCheckbox: true,
        rowRadio: false,
        pageTotal: undefined
    };
    formModel: FormGroup;
    OUT(e: _tableOut) {
        switch (e.type) {
            case 'more': {
                switch (e.handleData.k) {
                    case 'see': this.see(e.handleData.v['id']); break;
                    case 'edit': this.edit(e.handleData.v['id']); break;
                    case 'publish': this.publish([e.handleData.v['id']]); break;
                    case 'delete': this.delete([e.handleData.v['id']]); break;
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
    _hand(url, array) {
        this.http.ajax({ url: url, headers: [0, 2], type: 'post_array', arrayData: array }).subscribe(res => {
            this.snackbar.success('操作成功');
            this.DATA();
        });
    }

    see(id) {
        this.http.ajax({ url: fuck.h._5, headers: [0, 1], type: 'post', data: { noticeId: id } }).subscribe(res => {
            this.dialog.open(SeeDialogComponent, { data: res });
        });
    }
    edit(id) {
        this.http.ajax({ url: fuck.h._3, headers: [0, 1], type: 'post', data: { noticeId: id } }).subscribe(res => {
            this.dialog.open(EditDialogComponent, { data: res }).afterClosed().subscribe(k => {
                if (k == 1) {
                    this.DATA();
                }
            });
        });
    }
    pPublish() {
        this.publish(this.listIds);
    }
    pDelete() {
        this.delete(this.listIds);
    }
    publish(id) {
        let _d = this.confirm.ask({
            title: '发布',
            content: '确定要发布此通知吗？',
        }).subscribe(k => {
            _d.unsubscribe();
            _d = null;
            if (k == 1) {
                this._hand(fuck.h._6, id);
            }
        })
    }
    delete(id) {
        let _d = this.confirm.delete({
            title: '删除',
            content: '确定要删除选择的通知吗？',
        }).subscribe(k => {
            _d.unsubscribe();
            _d = null;
            if (k == 1) {
                this._hand(fuck.h._7, id);
            }
        })
    }
    dateChange(e) {
        this.formModel.get('publishStartTime').setValue(e.stime);
        this.formModel.get('publishEndTime').setValue(e.etime);
    }
    pageInfo = {
        publishStartTime: undefined,
        publishEndTime: undefined,
        noticeTypeId: undefined,
        status: undefined,
        title: undefined,
        page: 1,//int	1	当前页码	是
        pageSize: 10,//int	10	每页大小	是
    };
    search() {
        this.pageInfo.publishStartTime = this.formModel.value.publishStartTime;
        this.pageInfo.publishEndTime = this.formModel.value.publishEndTime;
        this.pageInfo.noticeTypeId = this.formModel.value.noticeTypeId;
        this.pageInfo.status = this.formModel.value.status;
        this.pageInfo.title = this.formModel.value.title;
        this.DATA();
    }
    add() {
        this.dialog.open(EditDialogComponent, { data: {} }).afterClosed().subscribe(k => {
            if (k == 1) {
                this.DATA();
            }
        });;
    }
    ngOnInit() {
        this.DATA();
        this.getTypes();
        this.formModel = new FormGroup({
            publishStartTime: new FormControl(undefined),
            publishEndTime: new FormControl(undefined),
            noticeTypeId: new FormControl(undefined),
            status: new FormControl(undefined),
            title: new FormControl(undefined),
        })
    }
    getTypes() {
        this.http.ajax({ url: fuck.h._8, headers: [0, 1], type: 'post' }).subscribe(res => {
            this.types = res;
        });
    }
    DATA() {
        let model = formModelClear(this.pageInfo);
        this.http.ajax({ url: fuck.h._2, headers: [0, 1], type: 'post', data: model }).subscribe(res => {
            res.rows.map(item => item.status = item.status == true ? '已发布' : '未发布')
            this.IN.dataSource = res.rows;
            this.IN.pageTotal = res.total;
            this.tableReset = !this.tableReset;
        }, error => {
            this.IN.pageTotal = -1;
            this.IN.errorMsg = this.http.errorMsg;
        });
    }

}
