//引用jQuery文件，方便提示编写（直接拖拽过来）
/// <reference path="jquery-1.7.1.js" />
/// <reference path="jquery-ui-1.8.20.js" />

var host = "http://172.19.87.1";
$(function () {
    //点击事件：点击model.html中的加号，添加数据
    $("div[type=table]").on("click", function () {
        //定义一个变量，获取当前点击的table（即，那个大加号）
        var target = $(this)[0];//后面可能会添加多个table（即，model页面的大加号），点击每个table都会弹出一个网页，并进行数据的添加，即下面的内容   这里的[0]是指第一个table
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

        //每个item-wrap包裹一个item的位置（location）和相应容器（item-container）  每个包裹都需动态生成，然后将这些item-wrap包裹附加到class=“items-wrap”的div下
        //html += '<div class="item-wrap"><div class="location-wrap">'
        ////html += '<div class="location-tab">指挥中心</div>'
        ////html += '<div class="location-tab">徐家汇派出所</div>'
        //html += '</div><div class="item-container">'
        ////for (var i = 0; i < 3; i++) {
        ////    html += '<div class="item" f="item" type="bar" targer=""><div class="item-preview"></div><div class="item-title"><div>2017年度徐汇区</div></div></div>'
        ////}
        //每个item-wrap包裹一个item的位置（location）和相应容器（item-container）

        html += '</div>'

        html += '</div></div><div class="menu-close"></div></div>'

        //拼接与menu-shade的兄弟元素config-iframe-wrap
        html+='<div class="config-iframe-wrap">'
        html+='<iframe id="config-iframe" name="config-content" src="item-config-index.html"></iframe>'
        html += '</div>'
        //拼接与menu-shade的兄弟元素config-iframe-wrap

        //弹出窗口的html网页拼接部分（是不是可以采用调用网页模板的形式或采用NVictory方式拼接html网页）

        $(".main").append(html);//class="main"的div下附加html



        //动态加载左侧导航栏中的数据
        $.ajax({
            cache: false,
            type: "Get",
            url: "http://localhost:10633/web/Data/TestThirdPartData.txt",
            dataType: 'text',
            contentType: "application/json; charset=utf-8",
            //url:http://172.19.87.1/xhq/SystemApi.ashx?req_type=5&username=admin&athcode=1,
            //url: host + "/xhq/SystemApi.ashx?req_type=5&username=admin&athcode=1",
            //dataType: "jsonp",
            async: false,
            success: function (response) {
                //var data = eval("(" + response.Data + ")")//将json字符串转换为json对象（调用后台给的URL时，使用此写法）
                var data = eval("(" + response + ")")//调用本地文件（txt（utf8格式））时，使用此写法
                //console.log(response);//在控制台检查接收到的数据

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
                                htmllist += '<div class="item" tid="' + list[m].id + '" type="' + list[m].displayType + '" targer=""  data-parent-index="' + j + '"  data-index="' + m + '" select="' + unit[j].UnitNameAbbr + '_' + list[m].displayType + '"><div class="item-chart"><div class="item-preview"></div><div class="item-title"><div>' + list[m].dataName + '</div></div></div><div class="itemInfo"><p>数据来源自：'+list[m].dataSource+'</p><p>数据表是：'+list[m].dataTable+'</p></div></div>';
                                
                            }
                        }

                        //跳出内层for循环，进行html拼接
                        htmlunit = htmlunit + htmllist + '</div></div>'
                        $(".items-wrap").append(htmlunit);

                    }

                    //点击每个区下的图表（★★★★★如何取消当前点击？当点击下一个同类型的图表时，将当前图表产生的内容清除掉，为下个图表产生的内容做准备）
                    $(".item").on("click", function () {
                        //点击主页面上的item跳到配置页面，进行配置，再由配置界面返回此主界面
                        $('.config-iframe-wrap').css('display', 'block');//config-iframe-wrap是主页面CSS的样式（在modelzhz.css中）

                        ////生成、跳转到对应的Echarts图表界面（此步骤是在配置页面点击“保存”按钮后，根据配置信息来生成图表，待做★★★★★★）
                        //var parentIndex = $(this).attr("data-parent-index");//获取当前点击的父索引
                        //var itemIndex = $(this).data("index");//获取当前点击item的索引

                        //var op = unit[parentIndex].dataList[itemIndex];//将当前unit[j]下的dataList赋值给option

                        //console.log(op);

                        //var type1 = $(this).attr("type");
                        //setTable.set(target, op, type1, "");
                        //$(".menu-close").click();

                    });

                }

              )

            }

        })

        //点击筛选按钮
        $('#selectID').on("click", function () {
            var divObj = $('#selectDiv');
            if (divObj.css('display') == 'none' || divObj.css('display') == '') {
                divObj.css('display', 'block');
            } else {
                divObj.css('display', 'none');
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
                        if (select.indexOf(type) >= 0) {//如果select值的字符串（每个item中定义的地名+图表类型，如xh_bar,xh_line）中包含type的值（图表筛选类型div定义的）     此判断意味着，只要下面各item中包含此类type就会被显示，否者被隐藏
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

    })
})

//----------------制作配置页面的所写代码：目的是实现从主页面的item跳到配置页面，再从配置页面回来--------------------
//通过iframe的src链接到配置界面
//$(".item").click(function () {//此处点击的item，是主页面上的item容器中的每个item
//    $('.config-iframe-wrap').css('display', 'block');//config-iframe-wrap是主页面CSS的样式（在modelzhz.css中）
//})

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