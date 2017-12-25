/// <reference path="jquery-3.2.1.js" />
/// <reference path="jquery-ui-1.11.0.js" />
//引用jQuery文件，方便提示编写（直接拖拽过来）

var host = "http://172.19.87.1";
//将其他函数需要调用的变量设置为全局变量(此处是将生成Echarts图表所需变量定义为全局变量)
var target;
var op;
var type1;
$(function () {
    //点击事件：点击model.html中的加号，添加数据
    $("div[type=table]").on("click", function () {
        ////如果
        if ($(this).children(".clear-table-wrap").length == 0) {
            //console.log($(this).length);
            //定义一个变量，获取当前点击的table（即，那个大加号）
            target = this;//后面可能会添加多个table（即，model页面的大加号），点击每个table都会弹出一个网页，并进行数据的添加，即下面的内容   这里的[0]是指第一个table 
            //console.log($("div[type=table].table1"));
            console.log(target);
            //var targetId = target.id;
            //console.log(targetId);
            //var thisid = $(this.id);
            //console.log(thisid);

            //为什么定义此变量？目的将生成的图表放到一个DOM对象中，在setTable（生成Echarts表的模板）中，即，后面点击每个item图表时，item图表在哪生成（生成的item图表放在哪儿）

            $(".menu-shade").remove();//先移除class=“menu-shade”div下的内容，下面再重新动态生成

            //弹出窗口的html网页拼接部分（是不是可以采用调用网页模板的形式或采用NVictory方式拼接html网页）
            var html = '<div class="menu-shade"><div class="menu">'
            html += '<div class="navigation">'
            //html += '<div class="left-tab">110警情</div>'
            //html += '<div class="left-tab">电子警察</div>'
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
            //拼接与menu-shade的兄弟元素config-iframe-wrap

            //弹出窗口的html网页拼接部分（是不是可以采用调用网页模板的形式或采用NVictory方式拼接html网页）

            $(".main").append(html);//class="main"的div下附加html

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
                    //if (response) {
                    //    var data = eval("(" + response.Data + ")");//将json字符串转换为json对象（调用后台给的URL时，使用此写法）
                    //} else {
                    //    alert('没有请求到数据');
                    //}
                    //★★★★★★ajax后台服务器请求成功后，服务器返回的数据会根据dataType的值解析后，传递给回调函数
                    //★★★例如，当dataType的值为text时，ajax请求成功后，服务器返回的数据将会根据dataType：text进行解析，将返回的数据转化为纯文本字符串，进而作为参数传递给回调函数（success后的回调函数）
                    //注意：采用dataType：text时，后台的数据加不加括号都行
                    var data1 = eval("(" + response + ")");//将json字符串转换为json对象（调用后台给的URL时，使用此写法）
                    var data = data1.Data;

                    //★★★例如，当dataType的值为json时，服务器返回的数据将会根据dataType：json进行解析，将返回的数据转化为json数据，进而作为参数传递给回调函数（success后的回调函数），由于此时的数据为json数据，所以可以通过参数直接调用json数据中的json对象，即response.Data
                    //注意：采用dataType：json时，后台的数据不能加括号包裹
                    //var data = response.Data;
                    //console.log(data);

                    //动态创建导航目录
                    //循环遍历第一层data下的每个对象，并调用每个对象中的键（dataType和UnitData）
                    for (var i = 0; i < data.length; i++) {
                        var htmldata = '';
                        htmldata += '<div class="left-tab">' + data[i].dataType + '</div>';
                        $(".navigation").append(htmldata);
                    }

                    //为动态创建的每个导航目录注册单击事件 （即，点击class=“left-tab”的div时，为id=“location”的div下动态添加class=“location-tab”的div）(注意点击当前目录时，去除其它目录点击产生的内容)
                    //var data0 = data[0].dataType;
                    //console.log(data[0]);
                    $(".left-tab").on("click", function () {

                        //当点击左侧导航目录时，先移除需要动态生成的div（即，清除之前点击，页面动态生成的div）

                        $(".item-wrap").remove();

                        var dataIndex = $(this).index();//获取当前点击导航目录的索引(★★★★★重点)
                        unit = data[dataIndex].UnitData;//获取data中的UnitData对象 当变量不加var时，此变量是全局变量
                        //将导航中所对应的UnitData中的所有unitName循环遍历出来
                        //循环遍历第二层UnitData下的每个对象，每个对象包含键（UnitName、dataList）
                        for (var j = 0; j < unit.length; j++) {
                            var htmlunit = '';
                            htmlunit += '<div class="item-wrap" ><div class="location-wrap"><div class="location-tab">' + unit[j].UnitName + '</div></div><div class="item-container">';

                            //$(".location-wrap").append(htmlunit);//将动态生成的div附加到相应的div下（此处将htmlunit追加到id=“location”的div下） 

                            //循环遍历，将dataList对象中的id、displayType、dataName放到指定的div中
                            var list = unit[j].dataList;//获取当前data[dataIndex]中dataList对象
                            //循环遍历dataList下的每个对象，dataList中对象的个数可能为0
                            var htmllist = '';
                            if (list.length !== 0) {
                                for (var m = 0; m < list.length; m++) {
                                    htmllist += '<div class="item" tid="' + list[m].id + '" type="' + list[m].displayType + '" targer=""  data-parent-index="' + j + '"  data-index="' + m + '" select="' + unit[j].UnitNameAbbr + '_' + list[m].displayType + '"><div class="item-chart"><div class="item-preview"></div><div class="item-title"><div>' + list[m].dataName + '</div></div></div><div class="itemInfo"><p>数据来源自：' + list[m].dataSource + '</p><p>数据表是：' + list[m].dataTable + '</p></div></div>';

                                }
                            }

                            //跳出内层for循环，进行html拼接
                            htmlunit = htmlunit + htmllist + '</div></div>'
                            $(".items-wrap").append(htmlunit);

                        }

                        //点击每个区下的图表
                        $(".item").on("click", function () {
                            //点击主页面上的item跳到配置页面，进行配置，再由配置界面返回此主界面
                            $('.config-iframe-wrap').css('display', 'block');//config-iframe-wrap是主页面CSS的样式（在modelzhz.css中）

                            ////生成、跳转到对应的Echarts图表界面（此步骤是在配置页面点击“保存”按钮后，根据配置信息来生成图表，）
                            parentIndex = $(this).attr("data-parent-index");//获取当前点击的父索引
                            itemIndex = $(this).data("index");//获取当前点击item的索引

                            op = unit[parentIndex].dataList[itemIndex];//将当前unit[j]下的dataList赋值给option

                            console.log(this);

                            type1 = $(this).attr("type");//获取当前点击图表框的图表类型 type="' + list[m].displayType + '"
                            //setTable.set(target, op, type1, "");
                            //$(".menu-close").click();

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

            ////当点击“筛选”时，通多toggle来控制items-wrap的高度
            //$('.items-wrap').toggle(function () {
            //    $(this).css("height", "56%");
            //}, function () {
            //    $(this).css("height", "86%")
            //});
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

    ////点击“清空”，清除添加的图表   ★★★★★事件的绑定问题：如果直接放在页面加载函数下，则当页面加载完成后，会依次为当前DOM树中元素绑定事件，即，为div[type=table]、clear-table绑定事件（单击事件），然而，在页面加载完成后，DOM树中没有clear-table元素，所以，就无法触发这个元素的事件，这个元素clear-table，是点击div[type=table]的事件然后调用函数第二次生成的DOM元素，所以应该在此时利用$(".clear-table")来获取第二次渲染生成的DOM树中的元素，为其绑定事件，这样才能触发此事件
    //$(".clear-table").on("click", function (evt) {
    //    $(this).parent().siblings().remove();
    //    //取消事件冒泡
    //    evt.stopPropagation();
    //});
})

//在此父页面中定义一个关闭子页面的方法（关闭iframe框架下的html），目的：被子页面调用
function closeIframe() {
    $(".config-iframe-wrap").css("display", "none")
}

//将变量写到函数外面便于其他函数也能使用从子页面传过来的配置参数
//获取子页面的传过来的实时数据的配置参数，在函数中进行处理
var module_rt_config_interval;
var module_rt_config_threshold;
function real_time_configPara(a, b) {
    module_rt_config_interval = a;
    module_rt_config_threshold = b;
}

//将变量写到函数外面便于其他函数也能使用从子页面传过来的配置参数
var module_ht_config_radio;
var module_ht_config_threshold;
//获取子页面的传过来的历史数据的配置参数，在函数中进行处理
function history_configPara(a, b) {
    module_ht_config_radio = a;
    module_ht_config_threshold = b;
}
//----------------制作配置页面的所写代码：目的是实现从主页面的item跳到配置页面，再从配置页面回来--------------------

//根据“实时数据”的配置信息生成Echarts图表
function setIntervalSetEchart() {
    //当第一次点击“保存”后，立即调用set方法，跳到图表生成界面，而定时调用set方法，进而刷新图表的程序写在下面，定时刷新图表
    var setTable = GetSetTable();
    setTable.set(target, op, type1, "");
    //当图表加载后，鼠标放在图标上不显示“图片加号”
    $(target).css("background-image", 'none');
    $(".menu-close").click();//调用关闭方法（关闭弹出页面）
    (function (st, tg, option) {
        //通过设置定时器，来控制Echarts图表的生成
        var intervalId = setInterval(function setEchart() {//★★★★★★注意：不需要设置形参，因为子页面调用此函数时就没有传参数
            //调用生成图表的方法
            st.set(tg, option, type1, "");
            //获取、定义当前图表框独有的index，再加上命名标注“clear”，组合成特有的Id，添加到div中，即，id="' + clearID + '"    目的是：当为“清空”按钮绑定事件时，选择器通过用Id的方式来，选择标签对象（在这里是div），进而所选的标签就是唯一的，而选择器中通过类样式选择的标签对象不唯一，会出现“事件叠加”的错误！
            var index = $(tg).data("index");
            var clearID = "clear" + index;
            if (option.geo == null) {
                //当定时刷新生成图表时，再次加上“清空”按钮栏
                var htmlClear = '<div class="clear-table-wrap"><div class="clear-table" id="' + clearID + '">清空</div></div>';
                $(tg).prepend(htmlClear);
            }
            else {
            }
            //调用定义的clearContent函数 
            //clearContent(intervalId);
            //★★★在自执行函数的计时器中调用自定义的bindClearEvent事件，目的：为定时更新生成的“清空”div绑定清除的点击事件
            bindClearEvent(intervalId, clearID, st, option);
        }, parseInt(module_rt_config_interval));
        var index = $(target).data("index");
        var clearID = "clear" + index;
        var htmlClear = '<div class="clear-table-wrap"><div class="clear-table" id="' + clearID + '">清空</div></div>';
        //$(".table-container-left-up").prepend(htmlClear);
        $(target).prepend(htmlClear);

        //★★★在自执行函数内，计时器外，调用自定义的bindClearEvent事件，目的：在计时器未启动前也可以点击“清除”，清除内容
        bindClearEvent(intervalId, clearID, st, option);


    })(setTable, target, op);

    //自定义一个函数，函数内部设置绑定清除的点击事件      （★★★此函数在自执行函数中进行调用）
    function bindClearEvent(timeID, cid, st, option) {
        //点击“清空”按钮
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
            $(this).parent().parent().removeClass("leaflet-container leaflet-retina leaflet-fade-anim");//由于当时不仔细将此句代码放到了$(this).remove();之后，造成错误。
            $(this).parent().parent().removeAttr("tabindex");

            $(this).parent().siblings().remove();
            $(this).parent().parent().removeAttr("style");
            $(this).parent().parent().removeAttr("_echarts_instance_");

            $(this).parent().remove();
            $(this).remove();
            //取消事件冒泡
            evt.stopPropagation();
        });
    }

    //点击“清空”按钮
    //clearContent(0);
    //$(".clear-table").on("click", function (evt) {
    //    //停止当前的计时器
    //    clearInterval(intervalId);

    //    $(this).parent().siblings().remove();
    //    $(this).parent().parent().removeAttr("style");
    //    $(this).parent().parent().removeAttr("_echarts_instance_");

    //    $(this).parent().remove();
    //    $(this).remove();
    //    //清除加载leaflet地图时产生的类样式table-container-middle-up leaflet-container leaflet-retina leaflet-fade-anim
    //    $(this).parent().parent().removeClass("leaflet-container");
    //    //取消事件冒泡
    //    evt.stopPropagation();
    //});

    //点击“清空”，清除添加的图表   ★★★★★事件的绑定问题：如果直接放在页面加载函数下，则当页面加载完成后，会依次为当前DOM树中元素绑定事件，即，为div[type=table]、clear-table绑定事件（单击事件），然而，在页面加载完成后，DOM树中没有clear-table元素，所以，就无法触发这个元素的事件，这个元素，是点击div[type=table]的事件然后调用函数第二次生成的DOM元素，所以应该在此时利用$(".clear-table")来获取第二次渲染生成的DOM树中的元素，为其绑定事件，这样才能触发此事件
    //$(".clear-table").on("click", function (evt) {
    //    //停止当前的计时器
    //    //$(this).clearinterval(intervalid);

    //    $(this).parent().siblings().remove();
    //    $(this).parent().parent().removeattr("style");
    //    $(this).parent().parent().removeattr("_echarts_instance_");

    //    $(this).parent().remove();
    //    $(this).remove();
    //    取消事件冒泡
    //    evt.stoppropagation();

    //});

}
//根据后台数据直接生成图表，没有添加任何配置界面的配置信息
function setEchart() {//★★★★★★注意：不需要设置形参，因为子页面调用此函数时就没有传参数

    var htmlClear = '<div class="clear-table-wrap"><div class="clear-table">清空</div></div>';
    $(".table-container-left-up").prepend(htmlClear);

    //调用生成图表的方法
    setTable.set(target, op, type1, "");
    $(".menu-close").click();//调用关闭方法（关闭弹出页面）
}
//根据“历史数据”的配置信息生成Echarts图表
function historySetEchart() {
    setEchart();
    //根据配置界面的“历史数据”配置参数，生成图表
}

//讨论的（待做）：
//var user;
//var arr = {"PlanID":"00000000-0000-0000-0000-000000000000","PlanName":null,"ModelID":null,"CreateUser":null,"CreateTime":"0001-01-01T00:00:00","Modules":[{"ModuleNumber":0,"DataCode":"00000000-0000-0000-0000-000000000000","Config":{"IsHistory":false,"RefrashTime":0,"HistoryDayGap":0,"LimitValue":null}}]};