import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";
import { ConfirmService } from '../tools/confirm/confirm.serve';
import { HttpService } from '../tools/serve/serve.serve';
import { fuck } from '../tools/url/index';

@Component({
    templateUrl: './component.html',
    styleUrls: ['./component.scss']
})
export class HomeComponent implements OnInit {

    username = '';
    navOpened = false;
    menus: Array<any> = [
        {
            label: '资金账户', childs: [
                { label: '在线支付', url: '/core/online', cur: false },
                { label: '线下支付', url: '/core/offline', cur: false },
            ]
        },
        {
            label: '账户管理', url: '/core/mat', cur: false, childs: []
        },
        {
            label: '角色与权限管理', url: '/core/role', cur: false, childs: []
        },
        {
            label: '商户管理', url: '/core/merchant', cur: false, childs: []
        },
        {
            label: '账户套餐管理', url: '/core/mats', cur: false, childs: []
        },
        {
            label: '收款确认', url: '/core/payment', cur: false, childs: []
        },
        {
            label: '收入明细', url: '/core/income', cur: false, childs: []
        },
        {
            label: '操作日志', url: '/core/log', cur: false, childs: []
        },
        {
            label: '客户反馈', url: '/core/feedback', cur: false, childs: []
        },
        {
            label: '订单管理', url: '/core/order', cur: false, childs: []
        },
        {
            label: '发票申请', url: '/core/invoice', cur: false, childs: []
        },
        {
            label: '通知管理', url: '/core/notice', cur: false, childs: []
        },
    ];
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor(private route: Router, private confirm: ConfirmService, private http: HttpService, ) {
        route.events.filter(event => event instanceof NavigationEnd)
            .subscribe((event: NavigationEnd) => {
            }).unsubscribe()
    }
    ngOnInit() {
        this.navOpened = window.innerWidth > 1200;
        this.username = sessionStorage.getItem('username') || '未登录';
    }
    loginout() {

        let _d = this.confirm.delete({
            title: '退出',
            content: '确定要退出登录吗？',
        }).subscribe(k => {
            _d.unsubscribe();
            _d = null;
            if (k == 1) {
                this.http.ajax({ url: fuck.e._2, headers: [0, 1], type: 'post', showErrorPage: false }).subscribe(res => {
                    this.goLogin();
                }, e => {
                    this.goLogin();
                })
            }
        })


    }
    goLogin() {
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('token');
        this.route.navigateByUrl('/login');
    }
    close() {
        this.menus.map(menu => {
            menu.cur && (menu.cur = false);
            menu.childs && menu.childs.map(child => {
                child.cur = false;
            })
        });
    }
    link(child) {
        this.close();
        child.cur = true;
        if (child.click) {
            child.click();
        }
        this.route.navigateByUrl(child.url);
    }
    rest(filterId?) {
        let a = document.querySelectorAll(".labelSinge  a");
        let b = document.querySelectorAll("input[type='checkbox']");
        for (let i = 0; i < a.length; i++) {
            if (!filterId) {
                a[i].className = "";
            }
        }
        for (let i = 0; i < b.length; i++) {
            if (filterId !== b[i].id) {
                b[i]['checked'] = false;
            }
        }
    }
    changeGroup(e) {
        this.rest(e.id);
    }
}
