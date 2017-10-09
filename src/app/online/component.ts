import { Component, OnInit } from '@angular/core';
import { _tableInput, _tableOut } from '../tools/interface/interface';
import { SnackService } from '../tools/snack/index';
import { HttpService } from '../tools/serve/serve.serve';
import { fuck } from '../tools/url/index';
import { MdDialog } from "@angular/material";
import { WXDialogComponent } from './dialog/wx';
import { ZFBDialogComponent } from './dialog/zfb';
@Component({
  templateUrl: './component.html',
  styleUrls: ['./component.scss']
})
export class _Component implements OnInit {
  WXStatus = undefined;
  ZFBStatus = undefined;

  constructor(private http: HttpService, private snackbar: SnackService, private dialog: MdDialog) {
  }


  ngOnInit() {
    this.setWXStatus();
    this.setZFBStatus();
  }
  setWXStatus() {
    this.WXStatus = undefined;
    this.http.ajax({ url: fuck.i._b._5, headers: [0, 1], type: 'post' }).subscribe(res => {
      this.WXStatus = res.result;
    });
  }
  setZFBStatus() {
    this.ZFBStatus = undefined;
    this.http.ajax({ url: fuck.i._b._10, headers: [0, 1], type: 'post' }).subscribe(res => {
      this.ZFBStatus = res.result;
    });
  }
  toggleWX(e) {
    let url = e ? fuck.i._b._3 : fuck.i._b._4;
    this.http.ajax({ url: url, headers: [0, 1], type: 'post' }).subscribe(res => {
      this.snackbar.success('操作成功');
    });
  }
  toggleZFB(e) {
    let url = e ? fuck.i._b._8 : fuck.i._b._9;
    this.http.ajax({ url: url, headers: [0, 1], type: 'post' }).subscribe(res => {
      this.snackbar.success('操作成功');
    });
  }
  WXConfig() {
    this._hand(fuck.i._b._2, WXDialogComponent)
  }
  ZFBConfig() {
    this._hand(fuck.i._b._7, ZFBDialogComponent);
  }
  _hand(url: string, _C) {
    this.http.ajax({ url: url, headers: [0, 1], type: 'post' }).subscribe(res => {
      this.dialog.open(_C, { data: res }).afterClosed().subscribe(k => {
        if (k == 1) {
          this.setWXStatus();
        } else if (k == 2) {
          this.setZFBStatus();
        }
      });
    });
  }
}
