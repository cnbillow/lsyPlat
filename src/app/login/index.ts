import { NgModule } from '@angular/core';
import { ToolModule } from '../tools/tool.module';
import { RoutingModule } from './routing';
import { _Component } from './component';
import { BgComponent } from './bg/component';

@NgModule({
    declarations: [BgComponent, _Component],
    imports: [ToolModule, RoutingModule],
    exports: [],
    providers: [],
})
export class Module { }