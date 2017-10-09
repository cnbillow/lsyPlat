import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { HttpService } from '../tools/serve/serve.serve';
import { fuck } from '../tools/url/index';
import { Md5 } from "ts-md5/dist/md5";
import { TEST } from '../tools/validators/index';
@Component({
    templateUrl: './component.html',
    styleUrls: ['./component.scss']
})
export class _Component implements OnInit {

    formModel: FormGroup;
    constructor(private http: HttpService, private route: Router, ) {
    }


    ngOnInit() {
        this.formModel = new FormGroup({
            usernameControl: new FormControl('', [Validators.required]),
            passwordControl: new FormControl('', [Validators.required, TEST.passwordIject]),
        });
    }
    submit(e: Event) {
        e.preventDefault();
        let model = this.formModel.value;
        this.http.ajax({
            url: fuck.e._1, headers: [1], type: 'post', data: {
                username: model.usernameControl,
                password: Md5.hashStr(model.passwordControl)
            }, showErrorPage: false
        }).subscribe(res => {
            sessionStorage.setItem("token", res.accessToken);
            sessionStorage.setItem('username', res.username);
            this.route.navigateByUrl('/core');
        });
    }
}
