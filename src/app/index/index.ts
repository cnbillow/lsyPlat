import { NgModule } from '@angular/core';
import { ToolModule } from '../tools/tool.module';
import { RoutingModule } from './routing';
import { _Component } from "./component";
@NgModule({
    declarations: [_Component],
    imports: [RoutingModule, ToolModule],
    exports: [],
    providers: [],
    entryComponents: []
})
export class Module { }