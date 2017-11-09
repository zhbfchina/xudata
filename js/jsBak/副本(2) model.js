var host = "http://172.27.109.1";
var op1 = {"grid":{"left":"3%","right":"4%","bottom":"3%","containLabel":true},"toolbox":{"feature":{"saveAsImage":{}}},"title":{"text":"折线图堆叠"},"tooltip":{"trigger":"axis","axisPointer":{"type":"line"}},"legend":null,"xAxis":{"boundaryGap":false,"data":["周一","周二","周三","周四","周五","周六","周日"],"type":"category"},"yAxis":{"type":"value"},"series":[{"stack":"总量","name":"邮件营销","type":"line","data":[120,132,101,134,90,230,210]},{"stack":"总量","name":"联盟广告","type":"line","data":[220,182,191,234,290,330,310]},{"stack":"总量","name":"视频广告","type":"line","data":[150,232,201,154,190,330,410]}]};
var op2 = { "grid": { "left": "3%", "right": "4%", "bottom": "3%", "containLabel": true }, "toolbox": { "feature": { "saveAsImage": {} } }, "title": { "text": "折线图堆叠" }, "tooltip": { "trigger": "axis", "axisPointer": { "type": "line" } }, "legend": null, "series": [{ "stack": "总量", "name": "邮件营销", "type": "line", "data": [120, 132, 101, 134, 90, 230, 210] }, { "stack": "总量", "name": "联盟广告", "type": "line", "data": [220, 182, 191, 234, 290, 330, 310] }, { "stack": "总量", "name": "视频广告", "type": "line", "data": [150, 232, 201, 154, 190, 330, 410] }], "xAxis": [{ "boundaryGap": false, "data": ["周一", "周二", "周三", "周四", "周五", "周六", "周日"], "type": "category" }], "yAxis": [{ "type": "value" }] };
var op3 = {"color":"170, 170, 170","grid":{"left":"3%","right":"4%","bottom":"3%","containLabel":true},"title":{"text":"哈哈"},"tooltip":{"trigger":"shadow","axisPointer":{"type":"line"}},"legend":null,"series":[{"barWidth":"60%","name":"邮件营销","type":"bar","data":[120,132,101,134,90,230,210]}],"xAxis":[{"data":["周一","周二","周三","周四","周五","周六","周日"],"axisTick":{"alignWithLabel":true},"type":"category"}],"yAxis":[{"type":"value"}]};
$(function(){

    $.ajax({
        cache: false,
        type: "Get",
        url: host + "/xhq/SystemApi.ashx?req_type=1&username=zhb&password=zhb&callback=?",
        contentType: "application/json; charset=utf-8",
        dataType: 'text',
        //dataType: "jsonp",
        async: false,
        success: function (response) {
            //var data = eval("(" + response.Data + ")")//将json字符串转换为json对象

            var data = eval("(" + response + ")")
            //循环遍历第一层data下的每个对象，并调用每个对象中的键（dataType和UnitData）
            for (var i = 0; i < data.length; i++) {
                var htmldata = '';
                htmldata += '<div class="left-tab">' + data[i].dataType + '</div>';
                $(".navigation").append(htmldata);

                var unit = data[i].UnitData;
                //循环遍历第二层UnitData下的每个对象，每个对象包含键（UnitName、dataList）
                for (var j = 0; j < unit.length; j++) {
                    var htmlunit = '';
                    htmlunit += '<div class="location-tab">' + unit[j].UnitName + '</div>';
                    $(".location").append(htmlunit);

                    var list = unit[j].dataList;
                    //循环遍历dataList下的每个对象，dataList中对象的个数可能为0
                    if (list.length !== 0) {
                        for (var m = 0; m < list.length; m++) {
                            var htmllist = '';
                            htmllist += '<div class="item" tid="' + list[m].id + '" type="' + list[m].displayType + '" targer=""><div class="item-title"><div>' + list[m].dataName + '</div></div></div>';
                            $(".item-container").append(htmllist);
                        }
                    }
                }
            }

        }, error: function (ex) {
            console.log(ex)
        }
    })

    $("div[type=table]").on("click",function(){
        var t = $(this)[0];//后面可能会添加多个table，点击每个table都会弹出一个网页，并进行数据的添加，即下面的内容   这里的[0]是指第一个table

        $(".menu-shade").remove();

        //弹出窗口的html网页拼接部分（是不是可以采用调用网页模板的形式或采用NVictory方式拼接html网页）
        var html = '<div class="menu-shade"><div class="menu"><div class="navigation">'
        //html += '<div class="left-tab">110警情</div>'
        //html += '<div class="left-tab">电子警察</div>'
        html += '</div><div class="content"><div class="location">'        
        //html += '<div class="location-tab">指挥中心</div>'    
        //html += '<div class="location-tab">徐家汇派出所</div>'
        html += '</div><div id="option" class="location-tab">筛选</div>'       
        html += '<div class="item-container">'
        //for(var i = 0;i<3;i++){
        //    html += '<div class="item" f="item" type="bar" targer=""><div class="item-preview"></div><div class="item-title"><div>2017年度徐汇区</div></div></div>'
        //}
        html += '</div>'            
        html += '</div></div><div class="menu-close"></div></div>'            
        //弹出窗口的html网页拼接部分（是不是可以采用调用网页模板的形式或采用NVictory方式拼接html网页）

        $(".main").append(html);//class="main"的div下附加html

        $("[f=item]").on("click",function(){//
            var type = $(this).attr("type");//获取当前点击标签的type属性，目的是：调用setTable中的set方法时，告诉他，传进去的option的数据类型是啥？指的是当前f="item"所在标签中的type是什么，即，type="bar"
            //var data = eval("("+op+")")
            //console.log(op);
            setTable.set(t,op3,type,"");//调用setTable.js中写的set方法
            $(".menu-close").click();//调用点击弹出页面上的×方法
            // $.ajax({
            //     cache: false,
            //     type: "Get",
            //     url: host + "/xhq/SystemApi.ashx?req_type=5&username=zhb&athcode=2&dtCode=1",
            //     contentType: "application/json; charset=utf-8",
            //     dataType: "jsonp",
            //     async: false,
            //     success: function (response) {
            //         var data = eval("("+response.Data+")")
            var dataList = eval("(" + response.Data.UnitData.dataList + ")")
            for (var m = 0; m < dataList.length; m++) {
                console.log(dataList);
                setTable.set(t, dataList[m], type, "");
            }
            $(".menu-close").click();
            //         data = eval("("+op+")")
            //         console.log(data);
            //         //setTable.set(t,data[0],type,"");
            //         $(".menu-close").click();
            //     }
            // })
        })
        
        //点击弹出页面上的×
        $(".menu-close").on("click",function(){
            $(".menu-shade").remove();
        });

        //点击弹出页面上的“筛选”
        $("#option").on("click",function(){
            var html = '<div class="option-menu">'
            html +='<div class="option-item" type="bar">柱状图</div>'
            html += '</div>'
            $(".item-container").append(html);
            
        })
    })
})