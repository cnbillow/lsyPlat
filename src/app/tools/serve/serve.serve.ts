import {
    Injectable
} from '@angular/core';
import {
    URLSearchParams,
    Http,
    Headers
} from '@angular/http';
import { Router } from "@angular/router";
import {
    Observable
} from "rxjs";
import 'rxjs';
import {
    ConfirmService
} from "../confirm/confirm.serve";
import { SnackService } from "../snack/index";
import { ServerCFG } from "../interface/interface";
import { host } from '../url/index';
import { MdDialog } from '@angular/material';
import { HomeComponent } from '../../home/component';

@Injectable()
export class HttpService {

    constructor(private http: Http, private confirm: ConfirmService, private snackbar: SnackService, private route: Router, private dialog: MdDialog) { }
    private headersArray = [{
        k: 'Authorization',
        v: ''
    },
    {
        k: 'Content-Type',
        v: 'application/x-www-form-urlencoded'
    },
    {
        k: 'Content-Type',
        v: 'application/json'
    }
    ];
    private myHeaders: Headers = new Headers();
    private setHeader(array: number[]) {
        let m = this.headersArray;
        for (let i = 0; i < m.length; i++) {
            this.myHeaders.delete(m[i].k);
        }
        for (let i = 0; i < array.length; i++) {
            let _k = array[i];
            this.myHeaders.append(m[_k].k, m[_k].v)
        }
        return {
            headers: this.myHeaders
        };
    }
    ajax(config: ServerCFG): Observable<any> {
        //loading
        this.confirm.Lshow();
        // token
        this.headersArray[0].v = 'Bearer ' + sessionStorage.getItem('token');
        // 参数
        let url = host + config.url;
        let dataStr = JSON.stringify(config.data || {});
        let headers = config.headers || [];
        let setting = this.setHeader(headers);
        let params = new URLSearchParams();

        for (let key of Object.keys(config.data || {})) {
            if (typeof config.data[key] == 'object') {
                config.data[key] = JSON.stringify(config.data[key])
            }
            params.append(key, config.data[key]);
        }
        // switch
        let reslut: Observable<any>;
        switch (config.type) {
            case 'post':
                reslut = this.http.post(url, params.toString(), setting);
                break;
            case 'post_json':
                reslut = this.http.post(url, dataStr, setting);
                break;
            case 'post_array':
                reslut = this.http.post(url, config.arrayData, setting);
                break;
            case 'get':
                reslut = this.http.get(url + "?" + params.toString(), setting);
                break;
            case 'importExcel':
                //   <input type="file" name="multipartFile" (change)="importExcel($event)">
                if (!config.fileName) {
                    throw new Error('缺少input[file]的name值！');
                }
                if (!config.fileEvent) {
                    throw new Error('缺少input[file]的dom事件参数event');
                }
                let fileList: FileList = config.fileEvent.target.files;
                if (fileList.length > 0) {
                    let file: File = fileList[0];
                    if (!/.xls|.xlsx/.test(file.name)) {
                        throw new Error('请传入xls或xlsx格式的excel文件！');
                    }
                    let formData: FormData = new FormData();
                    formData.append(config.fileName, file, file.name);
                    reslut = this.http.post(url, formData, setting)
                }
                break;
            case 'export':
                this.confirm.Lhide();
                return this.http.get(url, setting);
            default:
                this.confirm.Lhide();
                throw new Error('请添加请求type')
        }
        // return
        try {
            return reslut
                .do(() => this.confirm.Lhide(),
                error => {
                    this.confirm.Lhide();
                    let _error = fuckError(error);
                    this.errorMsg = _error.errorMessage || _error;
                    this.dialog.closeAll();

                    if (config.showErrorPage === false) {
                        this.snackbar.error(this.errorMsg);
                        return false;
                    }

                    switch (error.status) {

                        // case 400: this.route.navigateByUrl('/core/400'); break;
                        // case 403: this.route.navigateByUrl('/core/403'); break;
                        case 404: this.route.navigateByUrl('/core/404'); break;
                        // case 500: this.route.navigateByUrl('/core/500'); break;
                        case 401: break;
                        default: this.snackbar.error(this.errorMsg);
                    }
                    if (_error.errorCode == 'invalid_token') {
                        this.route.navigateByUrl('/login')
                    } else if (_error.errorCode == 'access_denied') {
                        // this.route.navigateByUrl('/core/refuse')
                    }
                }).map(res => JSON.parse(res._body));
        } catch (e) {
            throw new Error(e)
        }
    }
    public errorMsg = '';
}

let fuckError = (error: any) => {
    let body = error._body;
    try {
        let _j = JSON.parse(body);
        return typeof _j === 'object' ? _j.error : _j;

    } catch (e) {
        return body
    }
}   
