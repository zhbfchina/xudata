$(function () {

    /***获取其他页面通过URL传过来的参数，注意要在相应js对应的HTML页面中引用xhutility.js，否则无法调用parseUrl函数***/
    /****
    当在planList.html页面点击“自定义”，跳转到newPlanList.html页面的同时将用户名通过URL传过来，以便在此向后台请求数据、解析、动态生成模板列表
    ****/
    var v = parseUrl();//解析所有参数
    //alert(v['user_name']);//获取想要参数的值
    var login_user_name = v['user_name'];
    /***获取其他页面通过URL传过来的参数，注意要在相应js对应的HTML页面中引用xhutility.js，否则无法调用parseUrl函数***/

    //new一个ajax配置对象，作用：向后台发送用户名，请求预案列表
    var req_plans_config = new AjaxConfig();
    req_plans_config.url = "http://192.168.8.108/xhq/XHQGetAPI.ashx?req_type=2&username=" + login_user_name;
    req_plans_config.success = function (jsonString) {
        var jsonObj = eval("(" + jsonString + ")");//后台传过来的json字符串数据加了括号，所以在转成json对象时要去掉括号，同时dataType:"json"，也要隐掉，因为后台传过来的json字符串加了括号，就不是json类型的数据了，所以如果加上dataType:json，后台数据在经过http传输将数据解析成json类型的数据时就会报错parsererror

        //var Data = eval(jsonString);//后台响应的信息中去掉了括号，所以此处也要去掉，否则，报错：Uncaught SyntaxError: Unexpected identifier
        if (jsonObj.IsOk == 1) {
            var Data = jsonObj.Data;
            //遍历获取Data下的每个对象
            $.each(Data, function (kD, vD) {
                var htmlData = '';
                //htmlData += '<div class="new-plan-img-list"><a href="'+Data[kD].ModulesID+'" class="new-plan-img-box"><img class="new-plan-image" src="'+Data[kD].ModulesImgUrl+'" /></a></div>';
                htmlData += '<div class="new-plan-img-list"><a href="../page/models/' + Data[kD].ModulesID + '.html' + '?user_name=' + login_user_name + '" target="_blank" class="new-plan-img-box"><img class="new-plan-image" src="' + Data[kD].ModulesImgUrl + '" /></a></div>';
                
                $(".new-plan-lists-wrapper").append(htmlData);
            });
            ///**点击事件：实现点击模板列表跳转到本地对应的模板页面**/
            //$(".new-plan-img-box").click(function () {
            //    //获取当前点击模板的ID
            //    var $modelId = $(this).attr("href");
            //    //alert(window.location);
            //    //跳转到本地对应的模板页面   //前端跨页面传值之通过路径传值
            //    window.open('models/' + $modelId + '.html' + '?user_name=' + login_user_name);//相当于<a href="../page/planList.html" target="_blank"><img src="img.jpg" /></a>
            //});
        } else {
            alert("接收后台响应的数据失败！");
            return false;
        }

    };
    ajaxHelp(req_plans_config);

    

});