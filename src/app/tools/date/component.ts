import { Component, Output, EventEmitter, OnChanges, SimpleChanges, Input } from '@angular/core';
import { formateDataForMaterial } from './format';
@Component({
    selector: 'app-date',
    templateUrl: './component.html',
    styles: [`
    :host {
        position:relative;
        font-size: 14px;
    }
    md-form-field{
        width:140px;
    }
    md-form-field+md-form-field {
        margin-left:15px;
    }
    p {
        font-size: 12px;
        color: #f40;
        position: absolute;
        bottom: -2em;
        left: 0;
    }
    `]
})
export class _Component implements OnChanges {


    @Input() IN: { stime: string, etime: string };

    ngOnChanges(changes: SimpleChanges): void {
        this.sValue = this.IN.stime && new Date(Date.parse(this.IN.stime.replace(/-/g, "/"))) || undefined;
        this.eValue = this.IN.etime && new Date(Date.parse(this.IN.etime.replace(/-/g, "/"))) || undefined;
        this._sv = this.IN.stime;
        this._ev = this.IN.etime;
        this.testError();
    }

    @Output() OUT: EventEmitter<any> = new EventEmitter();

    minDay = new Date(2017, 8, 1);
    maxDay = new Date(new Date().getFullYear() + 20, 8, 1);
    sValue: Date;
    eValue: Date;
    _sv: any;
    _ev: any;
    timeError: boolean = false;
    clearDate(k, has) {
        if (!has) return false;
        if (k == 1) {
            this.sValue = undefined; this._sv = undefined
        } else if (k == 2) {
            this.eValue = undefined; this._ev = undefined
        }
        this.emit();
    }
    endDay() {
        return this.sValue || this.minDay;
    }
    testError() {
        let err = +this.sValue > +this.eValue;
        if (err) {
            this.eValue = undefined;
            this._ev = undefined;
            this.timeError = true;
        } else {
            this.timeError = false;
        }
        return err;
    }
    sChange(e) {
        this.sValue = e.value;
        this._sv = e.targetElement.value;
        !this.testError() && (this.emit());
    }
    eChange(e) {
        this.eValue = e.value;
        this._ev = e.targetElement.value;
        !this.testError() && (this.emit());
    }
    emit() {
        this.OUT.emit({
            stime: formateDataForMaterial(this._sv),
            etime: formateDataForMaterial(this._ev)
        });
    }
}
