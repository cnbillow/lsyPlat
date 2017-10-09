import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MD_ERROR_GLOBAL_OPTIONS, MD_PLACEHOLDER_GLOBAL_OPTIONS } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm } from "@angular/forms";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './home/index';
import { ErrorPageModule } from './errorPage/index';
@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        HomeModule,
        ErrorPageModule
    ],
    bootstrap: [AppComponent],
    providers: [
        { provide: MD_PLACEHOLDER_GLOBAL_OPTIONS, useValue: { float: 'never' } },
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: MD_ERROR_GLOBAL_OPTIONS, useValue: { errorStateMatcher: myErrorStateMatcher } }
    ]
})
export class AppModule { }

export function myErrorStateMatcher(control: FormControl, form: FormGroupDirective | NgForm): boolean {
    const isSubmitted = form && form.submitted;
    if (control.value && control.invalid) {
        return true;
    }
    return !!(control.invalid && (control.dirty || control.touched || isSubmitted));
}