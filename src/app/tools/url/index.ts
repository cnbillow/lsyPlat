export let host = 'http://cd.ydhl.com/plat/plat/';
export let fuck = {
    //商户管理
    a: {
        //分页查询商户
        _1: "merchants/findMerchantsPage",
        //批量停用
        _2: "merchants/updateMerchStateOFF",
        //批量启用
        _3: "merchants/updateMerchStateON",
        //商户导出
        _4: "merchants/exports",
    },


    //套餐管理
    b: {
        //分页查询套餐
        _1: "combo/findPlatComboPage",
        //通过套餐id查询详情
        _2: "combo/getPlatComboById",
        //新增套餐
        _3: "combo/insertCombo",
        //套餐更新
        _4: "combo/updateCombo",
        //套餐删除
        _5: "combo/deleteComboById",

    },


    //收入明细
    c: {
        //分页查询收入明细
        _1: "finance/findIncomeDetailsPage",
        //查询收入明细详情
        _2: "finance/getIncomeDetailsById",
        //查询收入金额
        _3: "finance/getIncomeAmount",
        //消费明细列表导出
        _4: "finance/exports",
    },

    //收款确认
    d: {
        //分页查询未确认收款财务信息
        _1: "finance/findUnConfirmFinancePage",
        //待收款详情简介
        _2: "finance/getSimpleFinanceById",
        //获取待收款金额
        _3: "finance/getUnConfirmAmount",
        //确认收款
        _4: "finance/confirmFinanceById",
        //作废收款
        _5: "finance/invaildFinanceById",
    },

    //管理员
    e: {
        //管理员登录
        _1: "user/pmall/userLogin",
        //管理员登出
        _2: "user/merchantsLoginOut",
        //分页查询管理员
        _3: "user/findUserPage",
        //新增管理员
        _4: "user/insertUser",
        //编辑管理员
        _5: "user/updateUser",
        //获取管理员信息
        _6: "user/getUserById",
        //删除管理员
        _7: "user/deleteUserById",
    },

    //角色
    f: {
        //分页查询角色
        _1: "role/findRolePage",
        //新增角色
        _2: "role/insertRole",
        //修改角色
        _3: "role/updateRole",
        //获取角色信息
        _4: "role/getRoleById",
        //删除角色
        _5: "role/deleteRoleById",
        //查询角色列表
        _6: "role/findAllRoleList",
        //查询权限列表
        _7: "privilege/findPrivilegeList",
    },

    //订单管理
    g: {
        //分页查询订单信息
        _1: "order/findOrderPage",
        //获取订单详情信息
        _2: "order/getOrderById",
        //订单导出
        _3: "order/exports",
    },

    //通知管理
    h: {
        //新增通知
        _1: "notice/insertNotice",
        //分页查询通知
        _2: "notice/findNoticePage",
        //查询通知详情 --编辑使用
        _3: "notice/getNoticeById",
        //编辑通知
        _4: "notice/updateNoticeById",
        //通知详情 
        _5: "notice/getNoticeDetailsById",
        //批量发布通知
        _6: "notice/publishNoticeByIdList",
        //批量删除通知
        _7: "notice/deleteNoticeByIdList",
        //查询所有通知类型
        _8: "noticeType/findNoticeList",
    },
    //资金账户
    i: {
        //线下支付
        _a: {
            //插入银行信息
            _1: "bankInfo/insertBankInfo",
            //更新银行信息
            _2: "bankInfo/updateBankInfo",
            //获取指定银行信息
            _3: "bankInfo/getBankInfoById",
            //获取银行信息分页
            _4: "bankInfo/findBankInfoPage",
            //删除指定银行信息
            _5: "bankInfo/removeBankInfoById",
        },
        //线上支付
        _b: {
            //保存/更新平台微信信息
            _1: "weiXinInfo/insertPlatWeiXinInfo",
            //获取平台微信信息
            _2: "weiXinInfo/getPlatWeixinInfo",
            //启用平台微信配置
            _3: "weiXinInfo/updatePlatWeixinInfoOnStatus",
            //停用平台微信配置
            _4: "weiXinInfo/updatePlatWeixinInfoOffStatus",
            //获取平台微信状态
            _5: "weiXinInfo/getPlatCurrentStatus",
            //保存/更新平台支付宝信息
            _6: "zhiFuBaoInfo/insertZhifubaoInfo",
            //获取平台支付宝信息
            _7: "zhiFuBaoInfo/getPlatZhifubaoInfo",
            //启用平台支付宝配置
            _8: "zhiFuBaoInfo/updatePlatZhifubaoInfoOnStatus",
            //停用平台支付宝配置
            _9: "zhiFuBaoInfo/updatePlatZhifubaoInfoOffStatus",
            //获取平台支付宝状态
            _10: "zhiFuBaoInfo/getPlatCurrentStatus",
        },
    },
    //客户反馈
    j: {
        //客户反馈分页
        _1: "feedBack/getFeedBackPage",
    },
    //发票申请
    k: {
        //发票申请分页
        _1: "invoice/findInvoicePage",
        //获取指定的发票信息
        _2: "invoice/getInvoiceById",
        //发票编辑
        _3: "invoice/updateInvoiceById",
        //获取所有发票状态
        _4: "invoice/getAllInvoiceStatus",
        //发票导出
        _5: "invoice/exports",
    },
    l: {
        // 获取操作日志
        _1: "operateLog/findOperateLogPage"
    }
}