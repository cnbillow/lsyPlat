import { NgModule } from '@angular/core';
import { ToolModule } from '../tools/tool.module';
import { RoutingModule } from './routing';
import { _Component } from "./component";
import { DialogComponent } from './dialog/component';
import { MyDateModule } from '../tools/date/index';
@NgModule({
    declarations: [_Component, DialogComponent],
    imports: [RoutingModule, ToolModule, MyDateModule],
    exports: [],
    providers: [],
    entryComponents: [DialogComponent]
})
export class Module { }