import {
    Injectable, Component
} from '@angular/core';
import {
    MdDialog
} from "@angular/material";
import {
    ConfirmComponent
} from "./confirm.component";
import { ConfirmCFG, LoadingCFG } from "../interface/interface";


@Injectable()
export class ConfirmService {
    constructor(private _dialog: MdDialog) { }


    Lshow() {
        let loadingDom;
        let timer = setInterval(() => {
            loadingDom = document.querySelector(".loading");
            if (loadingDom && (loadingDom instanceof Element)) {
                clearInterval(timer);
                loadingDom['style'].display = 'block';
            }
        }, 20)
    }
    Lhide() {
        let loadingDom;
        let timer = setInterval(() => {
            loadingDom = document.querySelector(".loading");
            if (loadingDom && (loadingDom instanceof Element)) {
                clearInterval(timer);
                loadingDom['style'].display = 'none';
            }
        }, 20)
    }



    delete = (cfg) => {
        cfg.type = 'delete';
        return this.confirm(cfg);
    }
    ask = (cfg) => {
        cfg.type = 'ask';
        return this.confirm(cfg);
    }


    private confirm = (cfg: ConfirmCFG) => {
        return this._dialog.open(ConfirmComponent, {
            data: cfg
        }).afterClosed()
    }
}


@Component({
    selector: 'app-loading',
    template: `<div class="loading">
    <div>
        <div class="c1"></div>
        <div class="c2"></div>
        <div class="c3"></div>
        <div class="c4"></div>
    </div>
    <span>loading</span>
</div>`,
})
export class LoadingComponent { }