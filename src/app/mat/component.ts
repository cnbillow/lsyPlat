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
      { k: 'id', v: 'ID' },
      { k: 'username', v: '用户名' },
      { k: 'roleName', v: '角色' },
      { k: 'createTime', v: '创建时间' },
      { k: 'lastLoginTime', v: '最后登录时间' },
      { k: 'more', v: '' },
    ],
    dataSource: [],
    moreItems: [
      { k: 'edit', v: '编辑' },
      { k: 'delete', v: '删除' },
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
          case 'delete': this.delete(e.handleData.v['id']); break;
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
    this.http.ajax({ url: url, headers: [0, 1], type: 'post', data: { userId: id } }).subscribe(res => {
      if (type == 'edit') {
        this.dialog.open(DialogComponent, { data: res }).afterClosed().subscribe(k => {
          if (k == 1) {
            this.DATA();
          }
        });
      } else {
        this.snackbar.success('操作成功');
        this.DATA();
      }
    });
  }
  edit(id) {
    this._hand(fuck.e._6, id, 'edit');
  }
  delete(id) {
    let _d = this.confirm.delete({
      title: '作废',
      content: '确定要删除该管理员？',
    }).subscribe(k => {
      _d.unsubscribe();
      _d = null;
      if (k == 1) {
        this._hand(fuck.e._7, id);
      }
    })
  }
  pageInfo = {
    username: undefined,
    page: 1,//int	1	当前页码	是
    pageSize: 10,//int	10	每页大小	是
  };

  ngOnInit() {
    this.DATA();
    this.formModel = new FormGroup({
      username: new FormControl(undefined),
    })
  }
  search() {
    this.pageInfo.username = this.formModel.value.username || undefined;
    this.DATA();
  }
  add() {
    this.dialog.open(DialogComponent, { data: {} }).afterClosed().subscribe(k => {
      if (k == 1) {
        this.DATA();
      }
    });
  }
  DATA() {
    this.http.ajax({ url: fuck.e._3, headers: [0, 1], type: 'post', data: this.pageInfo }).subscribe(res => {
      this.IN.dataSource = res.rows;
      this.IN.pageTotal = res.total;
    }, error => {
      this.IN.pageTotal = -1;
      this.IN.errorMsg = this.http.errorMsg;
    });
  }

}
