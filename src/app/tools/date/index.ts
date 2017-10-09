import { NgModule, LOCALE_ID } from '@angular/core';
import { _Component } from "./component";
import { MdDatepickerModule, MdNativeDateModule } from '@angular/material';
import { ToolModule } from '../tool.module';
@NgModule({
    declarations: [_Component],
    exports: [_Component],
    imports: [ToolModule, MdDatepickerModule, MdNativeDateModule],
    providers: [{ provide: LOCALE_ID, useValue: 'zh' }],
})
export class MyDateModule { }