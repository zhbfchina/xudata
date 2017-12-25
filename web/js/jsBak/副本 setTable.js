var setTable = function () {

    //设置利用option生成图表的模板，如果想生成多个不同option数据的图表，可以调此模板框架
    function set(target, data, type, color) {
        //target：指的是哪个目标，如，model.js中指的是哪个table var t = $(this)[0];
        //data：指数据中option那部分内容，传进来
        //type：指option中图表的类型是什么样的？ var type = $(this).attr("type");//获取当前点击标签的type属性，目的是：调用setTable中的set方法时，告诉他，传进去的option的数据类型是啥？指的是当前f="item"所在标签中的type是什么，即，type="bar"
        //color：指的是你想要设置的图表的颜色
        console.log(data);
        var myChart = echarts.init(target,'dark');//初始化时，可以将希望采用Echarts图表的哪个主题，直接写进去，此处采用dark主题

        // var s = [];
        // for(var i = 0 ;i<data.series.length;i++){
        //     s.push(data.series[i]);
        // }
        // console.log(s);
        // var option = {
        //     title: {
        //         text: data.dataName
        //     },
        //     tooltip: {},
        //     // legend: {
        //     //     data:['销量']
        //     // },
        //     xAxis: {
        //         type : 'category',
        //         data : data.xdata
        //     },
        //     yAxis: {},
        //     series: s,
        // };
        var option1 = data;//将传进来的data(op1、op2、op3...)赋值给option1

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option1);
    }

    return {
        set:set
    }
} ();