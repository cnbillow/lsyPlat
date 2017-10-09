import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { _Component } from './component';


const routes: Routes = [
    { path: '', component: _Component },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RoutingModule { }
