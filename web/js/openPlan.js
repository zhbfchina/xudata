/// <reference path="jquery-3.2.1.js" />
$(function () {
    /***获取其他页面通过URL传过来的参数，注意要在相应js对应的HTML页面中引用xhutility.js，否则无法调用parseUrl函数***/
    //获取planList.html通过URL传过来的参数
    var v = parseUrl();//解析通过URL传过来的所有参数
    var planId = v['planId'];//获取URL中想要的参数，预案名
    if (planId == undefined) {
        return;
    }
    /***获取其他页面通过URL传过来的参数，注意要在相应js对应的HTML页面中引用xhutility.js，否则无法调用parseUrl函数***/

    //new一个ajax配置对象，作用：向后台发送预案名，请求某个预案
    var req_plan_config = new AjaxConfig();
    req_plan_config.url = "http://192.168.8.108/xhq/XHQGetAPI.ashx?req_type=3&preCode=" + planId;
    req_plan_config.success = function (jsonString) {
        var jsonObj = eval("(" + jsonString + ")");//后台传过来的json字符串数据加了括号，所以在转成json对象时要去掉括号，同时dataType:"json"，也要隐掉，因为后台传过来的json字符串加了括号，就不是json类型的数据了，所以如果加上dataType:json，后台数据在经过http传输将数据解析成json类型的数据时就会报错parsererror

        //var Data = eval(jsonString);//后台响应的信息中去掉了括号，所以此处也要去掉，否则，报错：Uncaught SyntaxError: Unexpected identifier
        if (jsonObj.IsOk == 1) {
            var Data = jsonObj.Data;
            if (Data.PlanID != null) {
                var planName = Data.PlanName;
                $("#title").val(planName);
                var modules = Data.Modules;
                //循环遍历modules中的每个module
                $.each(modules, function (k, v) {
                    //因为在model.js中，生成echart图表的方法，调用的变量（target、op、dataCode）都是全局变量，所以，此处定义变量（用来获取后台传过来的预案信息数据）也要设置为全局变量
                    target = $("#table" + v.ModuleNumber)[0];//jQuery选择器
                    op = modules[k].Data;
                    dataCode = modules[k].DataCode;
                    var config = modules[k].Config;
                    if (config.IsHistory == 0) {//如果是“实时数据”
                        var refresh_time = config.RefreshTime;
                        var rt_limit_value = config.LimitValue;
                        //调用model.js中的real_time_configPara方法，原方法是为了获得配置页面传过来的配置信息给model.js页面定义的全局配置变量。但是此处相当于直接将后台保存好的配置信息传给model.js页面定义的全局配置变量，然后，全局配置变量被生成echart图表的方法调用
                        real_time_configPara(refresh_time, rt_limit_value, 0);
                        //调用生成实时echart图表的方法
                        setIntervalSetEchart();
                    } else {//如果是“历史数据”
                        var history_day_gap = config.HistoryDayGap;
                        var ht_limit_value = config.LimitValue;
                        real_time_configPara(history_day_gap, ht_limit_value, 1);
                        //调用生成实时echart图表的方法
                        setHistorySetEchart();
                    }
                });

            } else {
                alert("没有预案名，此处调到本地model.HTML模板自定义生成预案");
            }
        } else {
            alert("接收后台响应的数据失败！");
            return false;
        }

    };
    ajaxHelp(req_plan_config);
});