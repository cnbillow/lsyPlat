import { NgModule } from '@angular/core';
import { ToolModule } from '../tools/tool.module';
import { RoutingModule } from './routing';
import { _Component } from "./component";
import { MyDateModule } from '../tools/date/index';
import { EditDialogComponent } from './edit/component';
import { SeeDialogComponent } from './see/component';
import { SafeHtmlPipe } from '../tools/html/safe';
@NgModule({
    declarations: [_Component, EditDialogComponent, SeeDialogComponent, SafeHtmlPipe],
    imports: [RoutingModule, ToolModule, MyDateModule],
    exports: [],
    providers: [],
    entryComponents: [EditDialogComponent, SeeDialogComponent]
})
export class Module { }