
var setTable = function () {

    function set(target,data,type1,color){
        console.log(data);//在控制台查看传过来的data是什么
        var myChart = echarts.init(target, 'dark');//target:为ECharts准备一个具备大小（宽高）的Dom,var myChart = echarts.init(document.getElementById('main'));，即，生成的item图表放在哪儿


        //如果series中的对象比较多，而我们又需要获取所有对象的name值，那么可以遍历这个series数组，把每一个对象的name值都取出来
        var names = [];
        for (var i = 0; i < data.series.length; i++) {
            //names[i] = data.series[i].name;
            names.push(data.series[i].name);//和上面的效果一样
        }
        console.log(names);//在控制台查看生成的names具体包含什么

        var option1 = {

            tooltip: {//
                trigger: "axis"
            },
            legend: {
                data: names//
            },
            series:data.series,
            xAxis: {//
                type: "category",//
                boundaryGap: true,//类目起始和结束两端空白策略，默认为true留空，false则顶头
                data:data.xdata,//定向获取后台传过来的数据
            },
            yAxis: {//
                type: "value"
            },
            
        }

        //试验
        //var option1 = data
        //var option2 = {
            //legend: function (data) {
            //    var names = [];
            //    for (var i = 0; i < data.series.length; i++) {
            //        names[i] = data.series[i].name;
            //        return names;
            //    }
            //},
        //    xAxis: {
        //        type: "category",
        //        boundaryGap: true,
        //        data: option1.xdata
        //    },
        //    yAxis: {//
        //        type: "value"
        //    }
        //};
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option1);
        //myChart.setOption(option2);

        //浏览器大小改变时重置大小
        window.onresize = myChart.resize;
    }

    return {
        set:set
    }
} ();