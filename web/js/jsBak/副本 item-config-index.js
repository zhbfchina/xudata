/// <reference path="jquery-1.7.1.js" />
$(function () {
    //★★★★★方法一：利用iframe来嵌套网页，实现导航动态切换
    //为导航按钮设置点击切换的处理程序
    $('.top-tab').click(function () {

        //点击导航标签，修改iframe中的src，链接到不同的网页，实现切换
        var url = $(this).attr("type") + ".html";
        $("#mianframe").attr("src", url);

        //1、先清除所有click状态，并且全设置为unclick状态
        $('.top-tab').each(function () {
            $(this).removeClass($(this).attr("type") + "_click");
            $(this).addClass($(this).attr("type") + "_unclick");
        });

        //2、将当前点击的对象设置为点击状态（即，type=“xxxx_click”）
        $(this).removeClass($(this).attr("type") + "_unclick");
        $(this).addClass($(this).attr("type") + "_click");

    });
    //实现效果：当加载完页面标签后，显示第一个导航标签所对应的html，同时将其导航标签处于选中状态
    //★★★★★采用jQuery tab切换的方式来实现，之前写的利用iframe来嵌套网页的方式忘备份，不小心给误删了
     //var idx=0;
    //为导航按钮设置点击切换的处理程序
    //$('.top-tab').click(function () {
    //    //将导航tab与各自对应的content建立连接、联动
    //    $('.content-item').hide().eq($(this).index()).fadeIn().show();//eq(1)，对jQuery对象（实质就是DOM集合）里，index为1的DOM对象，进行操作。此处对与当前点击tab的index相同的content-item对象进行操作（淡入、显示，加不加.show()都行，都可以实现淡入效果，因为fadeIn()就有show的含义）
    //    //将点击的tab标签处于选中状态
    //    $('.top-tab').eq($(this).index()).addClass('tab-click').siblings().removeClass('tab-click');
    //    idx = 0;//在局部函数定义变量时，如果不加var，则视此变量为全局变量，如果加var则视为局部变量
    //    idx = $(this).index();
    //})

    //////实现效果：当加载完页面标签后，显示第一个tab标签所对应的content，同时将其tab标签处于选中状态
    //$('.content-item').hide().eq(0).fadeIn().show();//先隐藏所有content-item，再显示第一个
    //$('.top-tab').eq(0).addClass('tab-click');//将第一个tab处于点击状态


    ////试验测试：点击保存按钮，将生成的表格加载在iframe下
    $('.save').click(function () {
        //1、判断是对实时数据配置还是对历史数据进行配置
        if (idx==0) {
            //获取用户的输入
            var real_time_update_interval = $('#real-time-update-interval').val();
            var real_time_threshold = $('#real-time-threshold').val();
            
            //return real_time_update_interval, real_time_threshold;
            return $(window.parent.real_time_configPara(real_time_update_interval, real_time_threshold));
        } else if (idx==1) {
            //获取用户的选择和输入值
            var history_radio = $('input:radio:checked').val();
            var history_threshold = $('#history-threshold').val();
            //return history_radio, history_threshold;   
            return $(window.parent.history_configPara(history_radio, history_threshold));
        }
    })

    //点击取消按钮返回model界面（也可以在链接地址后面用？来指定返回到那个界面状态）
    $('.back').click(function () {
        $('#mainframe').contents().find('input[type=text]').val("");//返回时清除文本框里的内容
        $('#mainframe').contents().find('input[type=radio]').attr("checked", false);//设置radio处于未选中状态
        //$(window).attr('location', "modelzhzStaticModel.html");//相当于修改了iframe中的src路径
        $(window.parent.closeIframe());//在子页面（iframe框架下的html）调用父页面的关闭函数（关闭iframe）
    })
})