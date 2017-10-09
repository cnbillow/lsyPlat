import { NgModule } from '@angular/core';
import { ToolModule } from "../tools/tool.module";
import { RoutingModule } from './routing';
import { HomeComponent } from './component';
import { MdSidenavModule, MdMenuModule } from '@angular/material';
@NgModule({
    declarations: [HomeComponent],
    imports: [RoutingModule, ToolModule, MdSidenavModule, MdMenuModule],
    exports: [],
    providers: [],
})
export class HomeModule { }