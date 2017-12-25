/**注释太少**/
function SetTable() {
    var map;
    function removeMapContainer() {
        if (map) {
            map.remove();
        }
    }

    function set(target, data, color) {
        //console.log(data);//在控制台查看传过来的data是什么
        var geoMap = data.geo;
        if (geoMap) {

            //--------------leaflet与Echarts结合----------------------
            //target.id = target.class;//将class的名字直接赋值给id
            var mapId = target.id;//获取div元素的id
            //console.log(mapId);
            //var map = L.map(mapId);//将var map = L.map('map');替换掉
            //重新加载地图前，清空地图容器
            removeMapContainer();
            //设置map的option配置，定向确定是否显示或使用map的某些样式或功能
            var mapOption = {};
            mapOption.center = [31.187649, 121.451256];
            mapOption.zoom = 13;//设置地图的缩放级别
            mapOption.attributionControl = false;//不在地图容器上方显示地图的贡献控件
            mapOption.zoomControl = false;//不在地图容器上方显示缩放的控件
            //★★★★★创建一个地图实例m
            map = new L.map(mapId, mapOption);
            //定义地图的来源，即URL
            var tileAddress = 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}';
            //设置瓦片
            L.tileLayer(tileAddress, {
                //设置瓦片图层的option
                maxZoom: 20,
                //attribution: attribution,
                id: 'mapbox.streets'
            }).addTo(map);

            var overlay = new L.echartsLayer3(map, echarts);
            var chartsContainer = overlay.getEchartsContainer();
            var myChart = overlay.initECharts(chartsContainer);
            //--------------leaflet与Echarts结合----------------------

            var optionMap = {

                tooltip: {//
                    trigger: "axis"
                },
                legend: {
                    data: names//
                },
                geo: data.geo,
                series: data.series,
            };
            //直接为series中的配置项进行添加修改
            data.series[0].symbolSize = function (val) {
                return val[2] / 50;
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(optionMap);
            //myChart.setOption(optionMapExtend);
            //浏览器大小改变时重置大小
            window.onresize = myChart.resize;

        }
        else {
            var myChart = echarts.init(target, 'dark');//target:为ECharts准备一个具备大小（宽高）的Dom,var myChart = echarts.init(document.getElementById('main'));，即，生成的item图表放在哪儿

            //如果series中的对象比较多，而我们又需要获取所有对象的name值，那么可以遍历这个series数组，把每一个对象的name值都取出来
            var names = [];
            for (var i = 0; i < data.series.length; i++) {
                //names[i] = data.series[i].name;
                names.push(data.series[i].name);//和上面的效果一样
            }
            //console.log(names);//在控制台查看生成的names具体包含什么

            var option1 = {
                tooltip: {//
                    trigger: "axis"
                },
                legend: {
                    data: names//
                },
                series: data.series,
                xAxis: {//
                    type: "category",//
                    boundaryGap: true,//类目起始和结束两端空白策略，默认为true留空，false则顶头
                    data: data.xdata,//定向获取后台传过来的数据
                },
                yAxis: {//
                    type: "value"
                },

            };
            console.log(option1);
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option1);
            //myChart.setOption(option2);

            //浏览器大小改变时重置大小
            window.onresize = myChart.resize;
        }
    }

    return {
        set: set,
        removeMap: removeMapContainer
    }
}

//问题的原因分析：由于在原setTable.js中“var setTable=function(){}()”此方式只能将自执行函数赋值给那一个对象setTable，即自适自终生成的图表对象就那一个，当点击其他图表框生成图表时采用的还是那个实例，并没有额外的实例化出新的对象供其使用，所以要另外定义一个函数专门实例化出一个个对象，即，在下面将上面的构造函数实例化成对象

function getSetTable() {
    return new SetTable();
}

 