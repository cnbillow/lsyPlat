import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';

@Injectable()
export class SnackService {
    constructor(private snackBar: MdSnackBar) { }
    error(msg: string) {
        this.snackBar.open(msg, '', {
            duration: 3000, extraClasses: ['snackbar-fail']
        })
    }
    success(msg: string) {
        this.snackBar.open(msg, '', {
            duration: 1000, extraClasses: ['snackbar-success']
        });
    }
    msg(msg) {
        this.snackBar.open(msg, '', {
            duration: 2000
        });
    }
}