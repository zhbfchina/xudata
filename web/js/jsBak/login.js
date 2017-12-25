/// <reference path="jquery-3.2.1.js" />

$(function () {
    //获取用户的输入
    var $user_name = $("input[type=text]").val();
    var $password = $("input[type=password]").val();
    
    //将获取的用户通过ajax输入传给后台判断是否正确
    $.ajax({
        type: "post",
        url: "http://192.168.8.108/xhq/SystemApi.ashx?req_type=1&username=" + $user_name + "&password=" + $password,
        //data: "",
        cache: false,
        aysnc:false,
            success: function (jsonString) {
                var Data = eval("(" + jsonString + ")");//后台传过来的json字符串数据加了括号，所以在转成json对象时要去掉括号，同时dataType:"json"，也要隐掉，因为后台传过来的json字符串加了括号，就不是json类型的数据了，所以如果加上dataType:json，后台数据在经过http传输将数据解析成json类型的数据时就会报错parsererror

                //var Data = eval(jsonString);//后台响应的信息中去掉了括号，所以此处也要去掉，否则，报错：Uncaught SyntaxError: Unexpected identifier
                if (Data.IsOk == 1) {
                    alert("您输入的用户名和密码正确！");

                    //当后台判断用户输入的用户名和密码正确时，为“登录”按钮注册点击事件
                    $(".login").click(function () {
                        //点击“登录”时，在当前页打开跳转的页面
                        location.href = '../page/planList.html';//相当于<a href="../page/planList.html" target="_self"><img src="img.jpg" /></a>
                        //点击“登录”时。在跳转的页面在新的空白页打开显示
                        //window.open('../page/planList.html');//相当于<a href="../page/planList.html" target="_blank"><img src="img.jpg" /></a>
                    })
                } else {
                    alert("您输入的用户名或密码不正确，请重新输入！");
                    return false;
                }

            },
    error: function (err, XMLHttpRequest, textStatus, errorThrown) {//XMLHttpRequest 对象，错误信息，（可能）捕获的错误对象。 
        alert("error");
        alert(XMLHttpRequest.status);
        alert(XMLHttpRequest.readyState);
        alert(textStatus);
    }
    });

    
})