export interface _tableInput {
    errorMsg: string;//显示错误信息在表格中
    displayedColumns: _K_V[];//表格的头
    dataSource: any[];//数据
    moreItems: _K_V[];//更多
    rowCheckbox: boolean;//是否显示checkbox
    rowRadio: boolean;//是否显示radio
    pageTotal: number | string;//页数
}
export interface _K_V {
    k: string;
    v: string;
}
export interface _tableOut {
    handleData: _K_V;
    checkBoxList: number[];
    pageInfo: any;
    type: string;
}
export interface LoadingCFG {
    type: string;
    show: boolean;
}

export interface ConfirmCFG {
    type: string;
    title: string;
    content: string;
    colseAll?: boolean;
}
export interface ServerCFG {
    url: string;
    headers: any[];
    type: string;
    showErrorPage?: boolean;
    data?: {};
    arrayData?: number[];
    fileEvent?: any;
    fileName?: string;
}