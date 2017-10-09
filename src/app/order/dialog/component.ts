import { MD_DIALOG_DATA } from "@angular/material";
import { Component, Inject } from "@angular/core";

@Component({
    templateUrl: './component.html',
})
export class DialogComponent {
    constructor( @Inject(MD_DIALOG_DATA) public data: any) {
    }
}