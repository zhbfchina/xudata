/// <reference path="../jquery-3.2.1.js" />
$(function () {
    //当鼠标进入输入框时，输入框的宽度变大，即变长。
    $(".search-input").focus(function () {
        $(this).animate({ width: "50%" }, 1000);
    });
    //当鼠标离开输入框时，输入框的宽度恢复
    $(".search-input").blur(function () {
        $(this).animate({ width: "32%" }, 1000);
    });

    /***获取其他页面通过URL传过来的参数，注意要在相应js对应的HTML页面中引用xhutility.js，否则无法调用parseUrl函数***/
    var v = parseUrl();//解析所有参数
    //alert(v['user_name']);//获取想要参数的值
    var login_user_name = v['user_name'];
    /***获取其他页面通过URL传过来的参数，注意要在相应js对应的HTML页面中引用xhutility.js，否则无法调用parseUrl函数***/

    //登录时，已经将当前的登录用户信息已经传给后台，后台根据当前用户信息，调出相应的预案列表信息，以json字符串的形式等待传给前台，所以，在此，通过ajax向后台请求对应用户的预案列表信息，解析后台响应返回的json字符串，将json字符串中的各部分信息（这个是哪个预案，即，它的编号。这个预案的截图？这个预案的名称），对应放到预案块上。

    /**点击、请求、打开预案**/
    //new一个ajax配置对象，作用：向后台发送用户名，请求预案列表
    var req_plans_config = new AjaxConfig();
    req_plans_config.url = "http://192.168.8.108/xhq/XHQGetAPI.ashx?req_type=1&username=" + login_user_name;
    req_plans_config.success = function (jsonString) {
        var jsonObj = eval("(" + jsonString + ")");//后台传过来的json字符串数据加了括号，所以在转成json对象时要去掉括号，同时dataType:"json"，也要隐掉，因为后台传过来的json字符串加了括号，就不是json类型的数据了，所以如果加上dataType:json，后台数据在经过http传输将数据解析成json类型的数据时就会报错parsererror

        //var Data = eval(jsonString);//后台响应的信息中去掉了括号，所以此处也要去掉，否则，报错：Uncaught SyntaxError: Unexpected identifier
        if (jsonObj.IsOk == 1) {
            var Data = jsonObj.Data;
            //遍历获取Data下的每个对象
            $.each(Data, function (kD, vD) {
                var htmlData = '';
                htmlData += '<div class="img-list" planId="' + Data[kD].PlanID + '"><a href="' + Data[kD].ModelID + '" class="img-box"><img class="image" src="' + Data[kD].ImgUrl + '" /></a><div class="img-note">' + Data[kD].PlanName + '</div></div>';
                $(".plan-lists-wrapper").append(htmlData);
            });
            //为每个预案注册点击事件，实现跳转到对应的model页面，在model页面生成预案
            $(".img-list").click(function () {
                var $planId = $(this).attr("planId");
                var $modelId = $(this).children('a').attr("href");
                //前端跨页面传值之通过路径传值   将当前点击的图片所携带的预案名传给openPlan.js中
                window.open('models/' + $modelId + '.html' + '?planId=' + $planId);//相当于<a href="../page/planList.html" target="_blank"><img src="img.jpg" /></a>
            });
        } else {
            alert("接收后台响应的数据失败！");
            return false;
        }

    };
    ajaxHelp(req_plans_config);

    $(".plan-custom").click(function () {
        //alert(window.location);
        //前端跨页面传值之通过路径传值
        window.open('newPlanList.html' + '?user_name=' + login_user_name);//相当于<a href="../page/planList.html" target="_blank"><img src="img.jpg" /></a>
    });

})

