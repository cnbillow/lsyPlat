import { MD_DIALOG_DATA } from "@angular/material";
import { Component, Inject } from "@angular/core";

@Component({
    templateUrl: './component.html',
    styles: [
        `
        .ql-snow {
            box-shadow: 0px 0px 2px #ccc;
            margin: 2px 0;
        }
        `
    ]
})
export class SeeDialogComponent {
    constructor( @Inject(MD_DIALOG_DATA) public data: any) {
    }
}