/// <reference path="jquery-3.2.1.js" />
/// <reference path="jquery-ui-1.11.0.js" />
//引用jQuery文件，方便提示编写（直接拖拽过来）


//将其他函数需要调用的变量设置为全局变量(此处是将生成Echarts图表所需变量定义为全局变量)
//定义一个变量，获取当前点击的table，即，当前点击的图表
var target;
//将当前unit[j]下的dataList赋值给option，以便被生成echarts图表的函数调用
var op;
$(function () {
    //点击事件：点击model.html中的加号，添加数据
    $("div[type=table]").on("click", function () {
        /*判断：如果当前table中没有内容，即，没有图表，就执行相应程序，否则就执行对图表操作的程序*/
        if ($(this).children(".clear-table-wrap").length == 0) {
            //console.log($(this).length);
            //定义一个变量，获取当前点击的table（即，那个大加号）
            target = this;//后面可能会添加多个table（即，model页面的大加号），点击每个table都会弹出一个网页，并进行数据的添加，即下面的内容   这里的[0]是指第一个table            console.log(target);

            //为什么定义此变量？目的将生成的图表放到一个DOM对象中，在setTable（生成Echarts表的模板）中，即，后面点击每个item图表时，item图表在哪生成（生成的item图表放在哪儿）
            $(".menu-shade").remove();//先移除class=“menu-shade”div下的内容，下面再重新动态生成

            //弹出窗口的html网页拼接部分（是不是可以采用调用网页模板的形式或采用NVictory方式拼接html网页）
            var html = '<div class="menu-shade"><div class="menu">'
            html += '<div class="navigation">'

            html += '</div><div class="content">'
            html += '<div class="select-wrap">'
            html += '<div id="selectID" class="select select2">筛选</div>'
            html += '</div>'

            //动态添加筛选的div
            html += '<div id="selectDiv">'
            html += '<div class="itemType">'
            html += '<div type="scatter">单轴散点图</div><div type="line">基本折线图</div><div type="bar">基本柱状图</div><div type="bar">堆叠柱状图</div><div type="bar">正负轴柱状图</div><div type="pie">基本饼图</div><div type="pie">嵌套饼图</div><div type="pie">玫瑰图</div><div type="treemap">矩形树图</div><div type="sankey">桑基图</div><div type="heatmap">年日历图</div><div type="scatter">月日历图</div><div type="radar">雷达图</div><div type="effectScatter">地图散点图</div><div type="lines">地图迁徙图</div>'
            html += '</div>'
            html += '<div class="itemType">'
            html += '<div type="FJ">分局</div><div type="ZA">治安支队</div><div type="XJH">徐家汇</div><div type="FL">枫林</div><div type="TP">天平</div><div type="HN">湖南</div><div type="HM">虹梅</div><div type="XT">斜土</div><div type="HJ">华泾</div><div type="CHJ">漕河泾</div><div type="LH">龙华</div><div type="CQ">长桥</div><div type="TL">田林</div><div type="KJ">康健</div><div type="LY">凌云</div><div type="NZ">南站</div><div type="ST">上体</div>'
            html += '</div>'
            html += '</div>'

            //动态添加筛选的div
            html += '<div class="items-wrap">'
            html += '</div>'
            html += '</div></div><div class="menu-close"></div></div>'


            //拼接与menu-shade的兄弟元素config-iframe-wrap
            html += '<div class="config-iframe-wrap">'
            html += '<iframe id="config-iframe" name="config-content" src="../item-config-index.html"></iframe>'
            html += '</div>'


            //弹出窗口的html网页拼接部分（是不是可以采用调用网页模板的形式或采用NVictory方式拼接html网页）
            $(".main").append(html);//class="main"的div下附加html

            //★★★★★前台向后台发送get请求
            //动态加载左侧导航栏中的数据
            $.ajax({
                cache: false,
                type: "get",
                //url: "http://localhost:10633/web/Data/TestThirdPartData.txt",
                url: "http://localhost:10633/web/Data/zhbNewData.txt",
                dataType: 'text',
                contentType: "application/json; charset=utf-8",
                //url:http://172.19.87.1/xhq/SystemApi.ashx?req_type=5&username=admin&athcode=1,
                //url: host + "/xhq/SystemApi.ashx?req_type=5&username=admin&athcode=1",
                //dataType: "json",
                async: false,
                success: function (response) {

                    //★★★★★★ajax后台服务器请求成功后，服务器返回的数据会根据dataType的值解析后，传递给回调函数
                    //★★★例如，当dataType的值为text时，ajax请求成功后，服务器返回的数据将会根据dataType：text进行解析，将返回的数据转化为纯文本字符串，进而作为参数传递给回调函数（success后的回调函数）
                    //注意：采用dataType：text时，后台的数据加不加括号都行
                    var evalResData = eval("(" + response + ")");//将json字符串转换为json对象（调用后台给的URL时，使用此写法）
                    var data = evalResData.Data;

                    //★★★例如，当dataType的值为json时，服务器返回的数据将会根据dataType：json进行解析，将返回的数据转化为json数据，进而作为参数传递给回调函数（success后的回调函数），由于此时的数据为json数据，所以可以通过参数直接调用json数据中的json对象，即response.Data
                    //注意：采用dataType：json时，后台的数据不能加括号包裹

                    //动态创建导航目录
                    //循环遍历第一层data下的每个对象，并调用每个对象中的键（dataType和UnitData）
                    /*用$.each()高阶函数代替for循环*/
                    $.each(data, function (kd, vd) {
                        var htmldata = '';
                        htmldata += '<div class="left-tab">' + data[kd].dataType + '</div>';
                        $(".navigation").append(htmldata);
                    });

                    //为动态创建的每个导航目录注册单击事件 （即，点击class=“left-tab”的div时，为id=“location”的div下动态添加class=“location-tab”的div）(注意点击当前目录时，去除其它目录点击产生的内容) 
                    $(".left-tab").on("click", function () {

                        //当点击左侧导航目录时，先移除需要动态生成的div（即，清除之前点击，页面动态生成的div）
                        $(".item-wrap").remove();
                        var dataIndex = $(this).index();//获取当前点击导航目录的索引(★★★★★重点)
                        unit = data[dataIndex].UnitData;//获取data中的UnitData对象 当变量不加var时，此变量是全局变量

                        //将导航中所对应的UnitData中的所有unitName循环遍历出来
                        //循环遍历第二层UnitData下的每个对象，每个对象包含键（UnitName、dataList）
                        /*用$.each()高阶函数代替for循环*/
                        $.each(unit, function (ku, vu) {
                            var htmlunit = '';
                            htmlunit += '<div class="item-wrap" ><div class="location-wrap"><div class="location-tab">' + unit[ku].UnitName + '</div></div><div class="item-container">';

                            //循环遍历，将dataList对象中的id、displayType、dataName放到指定的div中
                            var list = unit[ku].dataList;//获取当前data[dataIndex]中dataList对象
                            //循环遍历dataList下的每个对象，dataList中对象的个数可能为0
                            var htmllist = '';
                            if (list.length !== 0) {
                                /*用$.each()高阶函数代替for循环*/
                                $.each(list, function (kl, vl) {
                                    htmllist += '<div class="item" tid="' + list[kl].id + '" type="' + list[kl].displayType + '" targer=""  data-parent-index="' + ku + '"  data-index="' + kl + '" select="' + unit[ku].UnitNameAbbr + '_' + list[kl].displayType + '"><div class="item-chart"><div class="item-preview"></div><div class="item-title"><div>' + list[kl].dataName + '</div></div></div><div class="itemInfo"><p>数据来源自：' + list[kl].dataSource + '</p><p>数据表是：' + list[kl].dataTable + '</p></div></div>';
                                });

                            }

                            //跳出内层for循环，进行html拼接
                            htmlunit = htmlunit + htmllist + '</div></div>'
                            $(".items-wrap").append(htmlunit);
                        });


                        //点击每个区下的图表
                        $(".item").on("click", function () {
                            //点击主页面上的item跳到配置页面，进行配置，再由配置界面返回此主界面

                            $('.config-iframe-wrap').css('display', 'block');//config-iframe-wrap是主页面CSS的样式（在modelzhz.css中）
                            ////生成、跳转到对应的Echarts图表界面（此步骤是在配置页面点击“保存”按钮后，根据配置信息来生成图表，）
                            parentIndex = $(this).attr("data-parent-index");//获取当前点击的父索引
                            itemIndex = $(this).data("index");//获取当前点击item的索引
                            op = unit[parentIndex].dataList[itemIndex];//将当前unit[j]下的dataList赋值给option
                            //console.log(this);
                            //先将dataCode作为自执行函数的参数传到函数体内，被Modules(index,dc);调用，最终将值传给预案中的DataCode
                            dataCode = $(this).attr("tid");//获取数据列表对象下的id值（后台给的），最终传给预案中的DataCode



                        });

                    }

                  )

                }

            })
        } else {

        }




        //点击筛选按钮
        $('#selectID').on("click", function () {
            var divObj = $('#selectDiv');
            if (divObj.css('display') == 'none' || divObj.css('display') == '') {
                divObj.css('display', 'block');
                //控制items-wrap的高度，变小
                $('.items-wrap').css("height", "56%");
            } else {
                divObj.css('display', 'none');
                //控制items-wrap的高度，变大
                $('.items-wrap').css("height", "86%");
            }

        })

        //点击"筛选"div中的图表类型选项或地名选项
        $(".itemType div").on("click", function () {//点击筛选层中的div

            //-------------做标记：为选中的div设置class=“active”---------------
            if ($(this).hasClass("active")) {//判断点击的div有没有class="active"，如果以前选过，再次选择时会清除class=“active”，可以通过CSS样式来标记之前选过，即标记它已被选中
                $(this).removeClass("active").css("background-color", "")
            } else {
                $(this).addClass("active").css("background-color", "gray")
            }
            //-------------做标记：为选中的div设置class=“active”---------------

            //---------判断哪些选项被选中，根据选中的个数筛选显示对应的图表----------
            if ($(".itemType div.active").length == 0) {//如果条目类型中下的class=“active”个数等于0个
                $("div.item").each(function () {//获取地名下的每个item（即给地名下的图表）进行循环遍历，添加CSS样式，将图表全部显示出来
                    $(this).css("display", "inline-block")
                })
            }
            else {//如果条目类型中下的class=“active”个数不等于0个
                $(".itemType div.active").each(function () {//获取条目类型中被选中的div，循环遍历
                    var type = $(this).attr("type")//★★★★★大前提准备工作：为筛选对话框中的每个图表标签div设置一个type属性，并获取type中的字符串值
                    $("div.item").each(function () {//获取地名下的每个item（即给地名下的图表）进行循环遍历，
                        var select = $(this).attr("select")//★★★★★大前提准备工作：为地名标签设置一个特有的select，以便点击地名时能选到那个地名栏
                        if (select.indexOf(type) >= 0) {//如果select值的字符串（每个item中定义的地名+图表类型，如xh_bar,xh_line）中包含type的值（图表筛选类型div定义的）  indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。     此判断意味着，只要下面各item中包含此类type就会被显示，否者被隐藏
                            $(this).css("display", "inline-block")
                        } else {
                            $(this).css("display", "none")
                        }
                    })
                })
            }
            //---------判断哪些选项被选中，根据选中的个数筛选显示对应的图表----------
        })

        //点击弹出页面上的×
        $(".menu-close").on("click", function () {
            $(".menu-shade").remove();
        });

    });

    //点击“保存”，提交所有配置配置参数
    $("input[type=submit]").on("click", function () {

        //利用循环将数组中的null值清除掉
        $.each(dicModules, function (k, v) {
            if (v == "" || typeof (v) == "undefined") {
                dicModules.splice(k, 1);
                k = k - 1;
            }
        })
        //功能要求：保存前，如果有图表model没选，取消提交，即跳出“保存”提交程序，就不让他生成预案
        if (dicModules.length == 6) {
            //获取用户输入的用户的名称
            //var planName = $("input[type=text]")[0].value;
            var planName = $("input[type=text]").val();
            if (planName == "" || typeof (planName) == "undefined") {
                alert("您未输入标题，请完成标题输入，谢谢！");
            } else {

                //定义变量plan，用来获得一个预案
                var plan = getPlan(dicModules, planName);
                var postData = "";
                postData = JSON.stringify(plan);//json对象转json字符串：JSON.stringify(jsonObj);
                //为了显示方便，弹出预案信息是什么
                alert(postData);
                //要实现的效果：保存后生成的图片中不显示隐藏的“清空”栏和“保存”按钮。即，触发html2Canvas生成截图前，移除相应的dom节点
                $(".clear-table-wrap").remove();//移除“清空”栏
                $("input[type=submit]").remove();//移除“保存”按钮，★★★可以形象的理解为“过河拆桥”
                
                //截屏（此处为截全屏，如果想截某个div的图像，可将document.body参数换成$("#id")）
                html2canvas(document.body, {

                    //allowTaint: true,//是否允许交叉的图像污染画布
                    //taintTest: false,
                    onrendered: function (canvas) {
                        //document.body.appendChild(canvas);//body后依附Canvas元素
                        var img = canvas.toDataURL();//获取到该canvas对象中所包含图片编码后的data: URL字符串
                        var base = encodeURIComponent(img);//转码，把字符串作为 URI 组件进行编码
                        //console.log(img);//在console中会输出图片的路径，可以复制该路径在浏览器进行粘贴，就可以看到该图片，注意：必须复制所有的字符，在当前浏览器地址栏中打开，才能查看到相应的图片
                        //为了减少ajaxUpLoad（）的参数，将ajax的data部分要传的数据，直接整合到一个代替
                        var pd = "post_data=" + postData + "&plan_img=" + base;
                        //调用自定义的函数ajaxUpLoad，上传截图
                        ajaxUpLoad(pd, 1);
                    }
                });
                
                /*定义一个上传方法，上传页面配置参数和截图，所以传两个参数*/
                function ajaxUpLoad(postData, reqType) {
                    //★★★★★数据从前台传到后台  其实ajax只需要type和URL属性就可以了
                    $.ajax({
                        type: "post",//以post形式向后台传递数据
                        url: "http://192.168.8.108/xhq/XHQReceiveAPI.ashx?req_type=" + reqType,//数据传输的目的地址，并将在这里对前台数据进行操作
                        data: postData,//前台传到后台的数据 ★★★两种写法：★//跟url get传参类似，多个值直接加&，变量用+进行连接  //★或者data:{id:1,name:zhangxiaofan,sex:male}

                        //dataType: "json",//当向后台传的数据不是json格式的时候需要加上此句
                        cache: false,//浏览器不缓存被请求页面，默认为true
                        async: false,// async默认是true(异步请求),如果想一个Ajax执行完后再执行另一个Ajax, 需要把async=false   例如，你用post请求传值到另一个页面后台，但是页面一加载你的ajax就已经执行过了，传值接收是在后台才完成的，这时候就请求不到数据，所以可以考虑把ajax请求改为同步试试。
                        success: function (jsonString) {
                            var Data = eval("(" + jsonString + ")");//后台传过来的json字符串数据加了括号，所以在转成json对象时要去掉括号，同时dataType:"json"，也要隐掉，因为后台传过来的json字符串加了括号，就不是json类型的数据了，所以如果加上dataType:json，后台数据在经过http传输将数据解析成json类型的数据时就会报错parsererror

                            //var Data = eval(jsonString);//后台响应的信息中去掉了括号，所以此处也要去掉，否则，报错：Uncaught SyntaxError: Unexpected identifier
                            if (Data.IsOk == 1) {
                                alert("向后台传输json字符串成功！");
                            } else {
                                alert("向后台传输json字符串失败！");
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
                }
            }


        }
        else {
            alert("您有未添加的图表，请继续完成添加，谢谢！");
            return false;
        }


    });

});


//在此父页面中定义一个关闭子页面的方法（关闭iframe框架下的html，即配置页面），目的：被子页面调用
function closeIframe() {
    $(".config-iframe-wrap").css("display", "none")
}
/****命名规则的统一***可以将这两个方法去掉**/
//将变量写到函数外面便于其他函数也能使用从子页面传过来的配置参数

//获取子页面的传过来的实时数据的配置参数，在函数中进行处理

var module_rt_config_interval;
var module_rt_config_threshold;
var mddule_is_history;
/*****
@param a update time
@param b 阈值  
@param c 是否是历史数据  
******/
function real_time_configPara(a, b, c) {
    module_rt_config_interval = a;
    module_rt_config_threshold = b;
    mddule_is_history = c;
}

//----------------制作配置页面的所写代码：目的是实现从主页面的item跳到配置页面，再从配置页面回来--------------------

//根据“实时数据”的配置信息生成Echarts图表
/************方法名称改变*************/
function setIntervalSetEchart() {
    //自执行函数，为了避免生成图表的方法被抢用，造成所有的图表最终都一样的怪状，将每个对象生成图表的过程放在自执行函数中进行
    (function (tg, option, dc) {

        /******************提取公共部分，使方法功能单一，简化代码********************/
        var setTable = getSetTable();
        var index = $(tg).data("index");
        var clearID = "clear" + index;
        //调用自定义的Modules方法，将各个点击选择的图表Module信息数据整合成一个数组，作为Modules键的值
        Modules(index, dc);
        //通过设置定时器，来控制Echarts图表的生成


        var intervalId = setInterval(function setEchart() {//★★★★★★注意：不需要设置形参，因为子页面调用此函数时就没有传参数
            //调用生成图表的方法函数
            setEchartCommon(setTable, tg, option);
            if (option.geo == null) {//如果加载的不是地图
                //调用动态添加“清空”div层的方法函数
                addClearDiv(tg, clearID);
            }
            else {

            }

            //调用清除绑定“清除”的点击事件 ★★★在自执行函数内，计时器外，调用自定义的bindClearEvent事件，目的：在计时器未启动前也可以点击“清除”，清除内容
            bindClearEvent(clearID, setTable, op, intervalId);
        }, parseInt(module_rt_config_interval));
        //调用生成图表的方法函数
        setEchartCommon(setTable, tg, option);
        //调用关闭方法（关闭弹出页面）
        $(".menu-close").click();

        //调用动态添加“清空”div层的方法函数
        addClearDiv(tg, clearID);

        //调用清除绑定“清除”的点击事件 ★★★在自执行函数内，计时器外，调用自定义的bindClearEvent事件，目的：在计时器未启动前也可以点击“清除”，清除内容
        bindClearEvent(clearID, setTable, op, intervalId);//★★参数的顺序一定要和定义的函数中的参数顺序一致，否则会报错！由于大意栽了跟头！


        /**************************************/
    })(target, op, dataCode);


}
//将生成图表的公共部分提取出来，目的：“实时数据”和“历史数据”生成图表时可直接调用
function setEchartCommon(setTable, target, op) {
    //var setTable = getSetTable();
    setTable.set(target, op);
    //调用自定义的公共方法，移除leaflet地图中的放大、缩小功能
    //当图表加载后，鼠标放在图标上不显示“图片加号”
    $(target).css("background-image", 'none');



}

//动态添加“清空”div层
function addClearDiv(target, clearID) {
    //var index = $(target).data("index");
    //var clearID = "clear" + index;
    var htmlClear = '<div class="clear-table-wrap"><div class="clear-table" id="' + clearID + '">清空</div></div>';
    //$(".table-container-left-up").prepend(htmlClear);
    $(target).prepend(htmlClear);

}

//自定义一个函数，函数内部设置绑定“清除”的点击事件      （★★★此函数在自执行函数中进行调用）
function bindClearEvent(cid, st, option, timeID) {
    //点击“清空”，清除添加的图表   ★★★★★事件的绑定问题：如果直接放在页面加载函数下，则当页面加载完成后，会依次为当前DOM树中元素绑定事件，即，为div[type=table]、clear-table绑定事件（单击事件），然而，在页面加载完成后，DOM树中没有clear-table元素，所以，就无法触发这个元素的事件，这个元素，是点击div[type=table]的事件然后调用函数第二次生成的DOM元素，所以应该在此时利用$(".clear-table")来获取第二次渲染生成的DOM树中的元素，为其绑定事件，这样才能触发此事件

    $("#" + cid).on("click", function (evt) {
        //重新加载图表时执行了removeMap(),但是点击“清除”时未执行removeMap()，地图容器还在，所以，报错：Map container is already initialized
        if (option.geo != null) {
            st.removeMap();
        }
        else {
        }
        //停止当前的计时器
        clearInterval(timeID);
        //清除加载leaflet地图时产生的类样式table-container-middle-up leaflet-container leaflet-retina leaflet-fade-anim
        $(this).parent().parent().removeClass("leaflet-container");//由于当时不仔细将此句代码放到了$(this).remove();之后，造成错误。
        $(this).parent().parent().removeAttr("tabindex");

        $(this).parent().siblings().remove();
        $(this).parent().parent().removeAttr("style");
        $(this).parent().parent().removeAttr("_echarts_instance_");

        $(this).parent().remove();
        $(this).remove();
        //取消事件冒泡
        evt.stopPropagation();
        delete dicModules[cid.substring(5)];//清除字典数组dicModules中对应ID的字符串
    });

}

//根据“历史数据”的配置信息生成Echarts图表
function setHistorySetEchart() {
    //自执行函数，为了避免生成图表的方法被抢用，造成所有的图表最终都一样的怪状，将每个对象生成图表的过程放在自执行函数中进行
    (function (tg, option, dc) {

        /******************提取公共部分，使方法功能单一，简化代码********************/
        var setTable = getSetTable();
        var index = $(tg).data("index");
        var clearID = "clear" + index;
        //调用自定义的Modules方法，将各个点击选择的图表Module信息数据整合成一个数组，作为Modules键的值
        Modules(index, dc);
        //通过设置定时器，来控制Echarts图表的生成

        //调用生成图表的方法函数
        setEchartCommon(setTable, tg, option);
        //调用关闭方法（关闭弹出页面）
        $(".menu-close").click();

        //调用动态添加“清空”div层的方法函数
        addClearDiv(tg, clearID);

        //调用清除绑定“清除”的点击事件 ★★★在自执行函数内，计时器外，调用自定义的bindClearEvent事件，目的：在计时器未启动前也可以点击“清除”，清除内容
        bindClearEvent(clearID, setTable, option);


        /**************************************/
    })(target, op, dataCode);
}


//讨论的（待做）：
//var user;
/*var arr = {"PlanID":null,"PlanName":"获取输入的标题名称","ModelID":null,"CreateUser":"","CreateTime":"","Modules":[{"ModuleNumber":0,"DataCode":"00000000-0000-0000-0000-000000000000","Config":{"IsHistory":false,"RefrashTime":0,"HistoryDayGap":0,"LimitValue":null}},
{"ModuleNumber":0,"DataCode":"00000000-0000-0000-0000-000000000000","Config":{"IsHistory":false,"RefrashTime":0,"HistoryDayGap":0,"LimitValue":null}}]};*/

//获取预案
function getPlan(dicM, pm) {
    var plan = new Plan(dicM, pm);
    return plan;
}
/*****
@param m dicModules
******/
function Plan(m, pm) {
    //this.PlanID = null;
    this.PlanName = pm;//获取输入的标题名后，赋值给相应变量，进而替换此处内容（待做）
    //this.ModelID = null;
    this.CreateUser = "";
    this.CreateTime = new Date();
    this.Modules = m;
}

//js中实例化一个字典的形式
var dicModules = new Array();

//将多个图表模块的信息整合到一块儿
function Modules(index, dataCode) {
    var config;
    var model;
    if (mddule_is_history == 0) {//不是历史数据，即是实时数据
        config = new Config(mddule_is_history, 0, module_rt_config_interval, module_rt_config_threshold);//调用函数Config，即，每个图表的配置信息       
    }
    else {
        config = new Config(mddule_is_history, module_rt_config_interval, 0, module_rt_config_threshold);
    }
    var model = new Module(index, dataCode, config);//调用函数Module，即，每个图表所包含的自身信息和配置信息

    dicModules[index] = model;
    // dic.push(plan);//push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。
}
//★每个图表模块所包含的自身信息和配置信息    
function Module(Mnumber, DCode, Cfig)//DataCode未确定
{
    this.ModuleNumber = Mnumber;
    this.DataCode = DCode;
    this.Config = Cfig;
}
//★每个图表的配置信息
function Config(IsHistoryC, RefrashTimeC, HistoryDayGapC, LimitValueC) {
    this.IsHistory = IsHistoryC;
    this.RefrashTime = RefrashTimeC;
    this.HistoryDayGap = HistoryDayGapC;
    this.LimitValue = LimitValueC;
}







