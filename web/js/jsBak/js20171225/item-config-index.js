/// <reference path="jquery-3.2.1.js" />

$(function () {
    /**添加注释**/
    var idx = 0;
    /**修改**/
    var configWindow = window;
    //为导航按钮设置点击切换的处理程序
    $('.top-tab').click(function () {
        //将导航tab与各自对应的content建立连接、联动
        $('.content-item').hide().eq($(this).index()).fadeIn().show();//eq(1)，对jQuery对象（实质就是DOM集合）里，index为1的DOM对象，进行操作。此处对与当前点击tab的index相同的content-item对象进行操作（淡入、显示，加不加.show()都行，都可以实现淡入效果，因为fadeIn()就有show的含义）
        //将点击的tab标签处于选中状态
        $('.top-tab').eq($(this).index()).addClass('tab-click').siblings().removeClass('tab-click');
        //idx = 0;//在局部函数定义变量时，如果不加var，则视此变量为全局变量，如果加var则视为局部变量
        idx = $(this).index();
    })

    ////实现效果：当加载完页面标签后，显示第一个tab标签所对应的content，同时将其tab标签处于选中状态
    $('.content-item').hide().eq(0).fadeIn().show();//先隐藏所有content-item，再显示第一个
    $('.top-tab').eq(0).addClass('tab-click');//将第一个tab处于点击状态

    //定义一个函数，获取用户输入的配置信息，并将配置信息传给父页面

    //点击“保存”将配置信息传给父页面，并调用父页面中生成图表的函数
    $('.save').click(function () {
        //1、判断是对实时数据配置还是对历史数据进行配置
        if (idx == 0) {
            //获取用户的输入
            var real_time_update_interval_value = $('#real-time-update-interval').val();
            var real_time_threshold = $('#real-time-threshold').val();
            var IsHistory = 0;
            //判断用户输入的数据是否为空和值是否大于最低限制，如果满足，执行程序，否则跳出
            //提醒：更新时间为空
            if (real_time_update_interval_value != "" || typeof (real_time_update_interval_value) != "undefined") {
            } else {
                alert("您输入的更新时间为空，请重新输入！");
                return false;
            }
            //提醒：更新时间小于60000
            if (real_time_update_interval_value >= 60000) {
            } else {
                alert("您输入的更新时间小于60000，请重新输入！");
                return false;
            }
            //提醒：阈值小于1
            if (real_time_threshold >= 1) {

            } else {
                alert("您输入的阈值小于1，请重新输入！");
                return false;
            }
            //判断：用户输入全正确，开始执行！
            if (real_time_update_interval_value != "" || typeof (real_time_update_interval_value) != "undefined" && real_time_update_interval_value >= 60000) {
                //return real_time_update_interval_value, real_time_threshold;
                $(window.parent.real_time_configPara(real_time_update_interval_value, real_time_threshold, IsHistory));
                //调用父页面中根据“实时数据”的配置信息生成Echarts图表的函数
                window.parent.closeIframe();//在子页面（iframe框架下的html，即关闭配置页面）调用父页面的关闭函数（关闭iframe）

                $(window.parent.setIntervalSetEchart());//★★★★★★注意：由于此处调用父页面的setEchart()时，没有进行传参，所以在父页面定义setEchart()函数时，不用设置形参

                //★★★★★★在什么样的情况下应该使用return？什么样的情况下不应该使用return？
                //当这个方法被别人调用时需要给别人返回值时，使用。否则，不用使用，要不然会由于return使函数结束，即，造成下面的语句得不到执行就跳出了函数
                //所以，此处应直接调用父页面的函数、传值给父页面的函数，然后在父页面的函数中设置变量来接收这些参数，当然用来接收这些参数的变量在父页面中也可定义为全局变量，进而被父页面的其他函数调用
            }


        } else if (idx == 1) {
            //获取用户的选择和输入值
            var history_radio = $('input:radio:checked').val();
            var history_threshold = $('#history-threshold').val();
            var IsHistory = 1;
            //对用户输入的历史数据参数进行判断
            if (history_threshold>=1) {
                //return history_radio, history_threshold;   
                //$(window.parent.history_configPara(history_radio, history_threshold));
                $(window.parent.real_time_configPara(history_radio, history_threshold, IsHistory));
                //调用父页面中根据“历史数据”的配置信息生成Echarts图表的函数
                $(window.parent.setHistorySetEchart());//★★★★★★注意：由于此处调用父页面的setEchart()时，没有进行传参，所以在父页面定义setEchart()函数时，不用设置形参
                window.parent.closeIframe();//在子页面（iframe框架下的html）调用父页面的关闭函数（关闭iframe）   
            }
            else {
                alert("您输入的阈值小于1，请重新输入！");
                return false;
            }
              
        }

    })

    //设置配置的默认值
    $('#real-time-update-interval').val("60000");//实时数据的刷新间隔
    $('#real-time-threshold').val("1");//实时数据的阈值
    $('#year').attr("checked", true);//历史数据，设置“一年”的radio处于选中状态
    $('#history-threshold').val("1");//历史数据的阈值默认值

    //点击取消按钮返回model界面（也可以在链接地址后面用？来指定返回到那个界面状态）
    $('.back').click(function () {

        //点击“取消”时，清除设置的值并恢复默认值
        $('#mainframe').contents().find('input[type=text]').val("");//返回时清除文本框里的内容
        $('#real-time-update-interval').val("60000");//将最开始默认的值写上
        $('#real-time-threshold').val("1");//将最开始默认的值写上
        $('#mainframe').contents().find('input[type=radio]').attr("checked", false);//设置所有radio处于未选中状态
        $('#year').attr("checked", true);//将最开始默认的值写上，即，设置“一年”的radio处于选中状态
        $('#history-threshold').val("1");//将最开始默认的值写上

        //$(window).attr('location', "modelzhzStaticModel.html");//相当于修改了iframe中的src路径
        $(window.parent.closeIframe());//在子页面（iframe框架下的html）调用父页面的关闭函数（关闭iframe）
    })
})