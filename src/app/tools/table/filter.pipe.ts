import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'filterValid'
})
export class FilterValidPipe implements PipeTransform {

    transform(value: any, args?: any): Array<any> {

        if (args.valid === '停用') {
            return value.filter(item => item.k !== 'stop');
        } else if (args.valid === '启用') {
            return value.filter(item => item.k !== 'open');
        } else {
            return value;
        }
    }
}


@Pipe({
    name: 'filterPublishValid'
})
export class FilterPublishPipe implements PipeTransform {

    transform(value: any, args?: any): Array<any> {

        if (args.status === '已发布') {
            return value.filter(item => item.k !== 'publish');
        } else {
            return value;
        }
    }
}
@Pipe({
    name: 'filterAdminValid'
})
export class FilterAdminPipe implements PipeTransform {

    transform(value: any, args?: any): Array<any> {
        if (args.admin === '是') {
            return [];
        } else {
            return value;
        }
    }
}
