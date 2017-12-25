/***********
定义一个函数，也是对象，也可称之为类（虽然JavaScript中没有类的概念）
ajax配置项：提取ajax中的配置项到
目的：通过此类，实例化出多个实例，进而可以使用多个ajax做请求、响应的工作
@param:reqUrl请求的url
@param:successFun请求成功的回调函数
************/
function AjaxConfig(reqUrl, successFun) {
    this.url = reqUrl;
    this.success = successFun;
    this.reqType = 'get';
    this.error = function (err, XMLHttpRequest, textStatus, errorThrown) {//XMLHttpRequest 对象，错误信息，（可能）捕获的错误对象。 
        alert("error");
        alert(XMLHttpRequest.status);
        alert(XMLHttpRequest.readyState);
        alert(textStatus);
    };
    this.postData = null;
}

/*************
ajax帮助函数
@param:ajaxConfig为ajax配置项
**************/
function ajaxHelp(ajaxConfig) {
    $.ajax({
        type: ajaxConfig.reqType,
        url: ajaxConfig.url,
        data: ajaxConfig.data,
        cache: false,
        aysnc: false,
        success: ajaxConfig.success,
        error: ajaxConfig.error
    });
}

 
/*************
前端跨页面传值之通过路径传值
定义函数：获取登录界面通过URL传过来的参数值 
**************/
function parseUrl() {
    var url = location.href;
    var i = url.indexOf('?');
    if (i == -1) return;
    var querystr = url.substr(i + 1);
    var arr1 = querystr.split('&');
    var arr2 = new Object();
    for (i in arr1) {
        var ta = arr1[i].split('=');
        arr2[ta[0]] = ta[1];
    }
    return arr2;
}
