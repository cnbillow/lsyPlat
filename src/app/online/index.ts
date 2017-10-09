import { NgModule } from '@angular/core';
import { ToolModule } from '../tools/tool.module';
import { RoutingModule } from './routing';
import { _Component } from "./component";
import { ZFBDialogComponent } from './dialog/zfb';
import { WXDialogComponent } from './dialog/wx';
@NgModule({
    declarations: [_Component, WXDialogComponent, ZFBDialogComponent],
    imports: [RoutingModule, ToolModule],
    exports: [],
    providers: [],
    entryComponents: [WXDialogComponent, ZFBDialogComponent]
})
export class Module { }