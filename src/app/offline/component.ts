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
      { k: 'accountName', v: '账户名称' },
      { k: 'bankName', v: '开户银行' },
      { k: 'accountNumber', v: '银行帐号' },
      { k: 'valid', v: '状态' },
      { k: 'more', v: '' },
    ],
    dataSource: [],
    moreItems: [
      { k: 'edit', v: '编辑' },
      { k: 'delete', v: '删除' }
    ],
    rowCheckbox: false,
    rowRadio: false,
    pageTotal: undefined
  };
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
  hand(id, bol) {

  }
  _hand(url, id, type?) {
    this.http.ajax({ url: url, headers: [0, 1], type: 'post', data: { bankInfoId: id } }).subscribe(res => {
      if (type == 'edit') {
        this.dialog.open(DialogComponent, { data: res }).afterClosed().subscribe(k => {
          if (k == 1) { this.DATA() }
        });
      } else {
        this.snackbar.success('操作成功');
        this.DATA();
      }
    });
  }
  edit(id) {
    this._hand(fuck.i._a._3, id, 'edit');
  }
  delete(id) {
    let _d = this.confirm.delete({
      title: '删除',
      content: '确定该银行信息？',
    }).subscribe(k => {
      _d.unsubscribe();
      _d = null;
      if (k == 1) {
        this._hand(fuck.i._a._5, id);
      }
    })
  }
  pageInfo = {
    page: 1,//int	1	当前页码	是
    pageSize: 10,//int	10	每页大小	是
  };

  ngOnInit() {
    this.DATA();
  }
  add() {
    //TODO
    this.dialog.open(DialogComponent, { data: {} }).afterClosed().subscribe(k => {
      if (k == 1) { this.DATA() }
    });
  }
  DATA() {
    this.http.ajax({ url: fuck.i._a._4, headers: [0, 1], type: 'post', data: this.pageInfo }).subscribe(res => {
      res.rows.map(item => item.valid = item.valid == true ? '启用' : '停用');
      this.IN.dataSource = res.rows;
      this.IN.pageTotal = res.total;
    }, error => {
      this.IN.pageTotal = -1;
      this.IN.errorMsg = this.http.errorMsg;
    });
  }

}
