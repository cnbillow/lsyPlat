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
      { k: 'ok', v: '确认收款' },
      { k: 'delete', v: '作废收款' },
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
          case 'ok': this.ok(e.handleData.v['id']); break;
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
    this.http.ajax({ url: url, headers: [0, 1], type: 'post', data: { id: id } }).subscribe(res => {

      if (type == 'see') {
        this.dialog.open(DialogComponent, { data: res });
      } else {
        this.snackbar.success('操作成功');
        this.DATA();
      }
    });
  }
  see(id) {
    this._hand(fuck.d._2, id, 'see');
  }
  ok(id) {
    let _d = this.confirm.ask({
      title: '确认收款',
      content: '是否要确认收款吗？',
    }).subscribe(k => {
      _d.unsubscribe();
      _d = null;
      if (k == 1) {
        this._hand(fuck.d._4, id);
      }
    })
  }
  delete(id) {
    let _d = this.confirm.delete({
      title: '作废',
      content: '确定要作废该收款项？',
    }).subscribe(k => {
      _d.unsubscribe();
      _d = null;
      if (k == 1) {
        this._hand(fuck.d._5, id);
      }
    })
  }
  price() {
    this.http.ajax({ url: fuck.d._3, headers: [0, 1], type: 'post' }).subscribe(res => this.unConfirmAmount = res.result);
  }
  unConfirmAmount: number = 0;
  pageInfo = {
    keyWord: undefined,
    page: 1,//int	1	当前页码	是
    pageSize: 10,//int	10	每页大小	是
  };

  ngOnInit() {
    this.DATA();
    this.price();
    this.formModel = new FormGroup({
      keyWord: new FormControl(undefined),
    })
  }
  search() {
    this.pageInfo.keyWord = this.formModel.value.keyWord || undefined;
    this.DATA();
  }
  DATA() {
    this.http.ajax({ url: fuck.d._1, headers: [0, 1], type: 'post', data: this.pageInfo }).subscribe(res => {
      this.IN.dataSource = res.rows;
      this.IN.pageTotal = res.total;
    }, error => {
      this.IN.pageTotal = -1;
      this.IN.errorMsg = this.http.errorMsg;
    });
  }

}
