import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/component';
import { _Component_refuse } from './errorPage/component_refuse';
import { _Component500 } from './errorPage/component500';
import { _Component404 } from './errorPage/component404';
import { _Component403 } from './errorPage/component403';
import { _Component400 } from './errorPage/component400';

const routes: Routes = [

    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: 'login', loadChildren: 'app/login#Module' },
    {
        path: 'core', component: HomeComponent, children: [
            { path: '', loadChildren: 'app/index#Module' }, //在线支付
            { path: 'online', loadChildren: 'app/online#Module' }, //在线支付
            { path: 'offline', loadChildren: 'app/offline#Module' }, //线下支付
            { path: 'mat', loadChildren: 'app/mat#Module' }, //账户管理
            { path: 'role', loadChildren: 'app/role#Module' }, //角色与权限管理
            { path: 'merchant', loadChildren: 'app/merchant#Module' }, //商户管理
            { path: 'mats', loadChildren: 'app/mats#Module' }, //账户套餐管理
            { path: 'payment', loadChildren: 'app/payment#Module' }, //收款确认
            { path: 'income', loadChildren: 'app/income#Module' }, //收入明细
            { path: 'log', loadChildren: 'app/log#Module' }, //操作日志
            { path: 'feedback', loadChildren: 'app/feedback#Module' }, //客户反馈
            { path: 'order', loadChildren: 'app/order#Module' }, //订单管理
            { path: 'invoice', loadChildren: 'app/invoice#Module' }, //发票申请
            { path: 'notice', loadChildren: 'app/notice#Module' }, //通知管理
            { path: '400', component: _Component400 },
            { path: '403', component: _Component403 },
            { path: '404', component: _Component404 },
            { path: '500', component: _Component500 },
            { path: 'refuse', component: _Component_refuse },
        ]
    },
    { path: '**', pathMatch: 'full', redirectTo: 'login' }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
