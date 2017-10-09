import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { ConfirmComponent } from "./confirm/confirm.component";
import { ConfirmService, LoadingComponent } from "./confirm/confirm.serve";
import { CommonModule } from '@angular/common';
import {
    MdButtonModule,
    MdInputModule,
    MdIconModule,
    MdCheckboxModule,
    MdRadioModule,
    MdDialogModule,
    MdSelectModule,
    MdSlideToggleModule,
    MdCardModule,
    MdPaginatorModule,
    MdMenuModule,
    MdProgressSpinnerModule,
    MdSnackBarModule,
    MdListModule,
} from '@angular/material';
import { HttpService } from "./serve/serve.serve";
import { SnackService } from "./snack/index";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TableComponent } from "./table/table.component";
import { FilterValidPipe, FilterPublishPipe, FilterAdminPipe } from './table/filter.pipe';
@NgModule({
    imports: [
        HttpModule,
        CommonModule,
        MdButtonModule,
        MdInputModule,
        MdIconModule,
        MdCheckboxModule,
        MdRadioModule,
        MdDialogModule,
        MdSelectModule,
        MdSlideToggleModule,
        MdCardModule,
        MdPaginatorModule,
        MdMenuModule,
        MdProgressSpinnerModule,
        MdSnackBarModule,
        MdListModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    exports: [
        CommonModule,
        MdButtonModule,
        MdInputModule,
        MdIconModule,
        MdCheckboxModule,
        MdRadioModule,
        MdDialogModule,
        MdSelectModule,
        MdSlideToggleModule,
        MdCardModule,
        ReactiveFormsModule,
        FormsModule,
        MdPaginatorModule,
        MdMenuModule,
        MdListModule,
        TableComponent,
        LoadingComponent,
    ],
    declarations: [ConfirmComponent, TableComponent, FilterValidPipe, FilterPublishPipe, FilterAdminPipe, LoadingComponent],
    providers: [ConfirmService, HttpService, SnackService],
    entryComponents: [ConfirmComponent]
})
export class ToolModule { }