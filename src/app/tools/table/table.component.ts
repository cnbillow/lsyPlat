import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild, OnInit, OnDestroy, DoCheck, AfterViewChecked, AfterViewInit } from '@angular/core';
import { MdPaginator } from '@angular/material';
import { _tableInput, _tableOut } from "../interface/interface";
@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnChanges, OnInit {

    @Input() reset;
    @Input() IN: _tableInput;
    @Output() OUT: EventEmitter<_tableOut> = new EventEmitter();
    _out: _tableOut = {
        handleData: undefined,
        checkBoxList: undefined,
        pageInfo: undefined,
        type: undefined
    }
    @ViewChild(MdPaginator) paginator: MdPaginator;

    checkeds: boolean = false;
    ////////////////////
    ////////////////////
    ngOnInit() {
        this.paginator && (this.paginator._intl.itemsPerPageLabel = '每页显示条数：');
        this.paginator && (this.paginator._intl.nextPageLabel = '下一页');
        this.paginator && (this.paginator._intl.previousPageLabel = '上一页');
        this.paginator && (this.paginator._intl.getRangeLabel = spanishRangeLabel);
    }
    ngOnChanges(changes: SimpleChanges) {
        this.resetFn();
    }
    resetFn() {
        this.checkeds = false;
        this.IN.dataSource.map(item => {
            if (!('checked' in item)) {
                item.checked = false;
            }
        });
        this._out.checkBoxList = [];
        setTimeout(() => { this.emit('checkbox'); }, 0);
    }
    columnClass(column) {
        return /^checkbox|radio|more$/g.test(column)
    }
    emit(type) {
        if (this.IN && this.IN.dataSource && this.IN.dataSource.length) {
            this._out.type = type;
            this.OUT.emit(this._out);
        }
    }
    moreItem(type: string, data: any) {
        let o = { k: type, v: data };
        this._out.handleData = o;
        this.emit('more');
    }
    checkboxChange(e, data) {
        if (data == 'head') {
            this.IN.dataSource.map(item => item.checked = e.checked);
        } else {
            this.IN.dataSource.find(item => item.id == data.id).checked = e.checked;
        }
        this.checkeds = !this.IN.dataSource.find(item => item.checked == false);
        let idList = [];
        this.IN.dataSource.filter(item => item.checked == true).map(item => idList.push(+item.id))
        this._out.checkBoxList = idList;
        this.emit('checkbox');
    }
    pageTor(e) {
        this._out.pageInfo = e;
        this.emit('page');
    }
}

////////////////////
////////////////////
////////////////////
const spanishRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length == 0 || pageSize == 0) { return `0 / ${length}`; }
    length = Math.max(length, 0) || 0;
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} / ${length}`;
}

