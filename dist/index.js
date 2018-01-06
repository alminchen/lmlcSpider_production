"use strict";$(document).ready(function(){function t(t,e,a){var n;if("min"==e){var i=Math.min.apply(null,t);n=parseInt(i/Math.pow(10,i.toString().length-a))*Math.pow(10,i.toString().length-a)}if("max"==e){var r=Math.max.apply(null,t);(n=(parseInt(r/Math.pow(10,r.toString().length-a))+1)*Math.pow(10,r.toString().length-a))<1e4&&(n=1e4)}return n}function e(){var e="",a=parseInt($("#selectDelta").val());e=a>=3600?a/3600+"小时":a>=60?a/60+"分钟":a+"秒",$.post("/ajax/getInitSales",{delta:a},function(n){var r=n.data.span,d=n.data.total;i.myChart1&&i.myChart1.clear(),i.timer&&clearInterval(i.timer),i.myChart1=echarts.init(document.getElementById("nowSales"));var o={title:{text:"实时数据",subtext:"约"+e+"刷新"},tooltip:{trigger:"axis",axisPointer:{type:"cross",label:{backgroundColor:"#283b56"}}},legend:{data:["最新售卖记录","已售总金额"]},xAxis:[{type:"category",boundaryGap:!0,data:function(){for(var t=new Date,e=[],n=10;n--;){var i="";i=t.toLocaleDateString()==(new Date).toLocaleDateString()?t.toTimeString().split(" ")[0]:"昨"+t.toTimeString().split(" ")[0],e.unshift(i),t=new Date(t-1e3*a)}return e}()}],yAxis:[{type:"value",scale:!0,name:"已售总金额",min:t(d,"min",3),max:t(d,"max",3),boundaryGap:[.2,.2]},{type:"value",scale:!0,name:"前"+e+"售卖金额",min:t(r,"min",2),max:t(r,"max",2),boundaryGap:[.2,.2]}],series:[{name:"前"+e+"售卖金额",type:"bar",xAxisIndex:0,yAxisIndex:1,data:r},{name:"已售总金额",type:"line",xAxisIndex:0,yAxisIndex:0,data:d}]};i.myChart1.setOption(o),i.timer=setInterval(function(){$.post("/ajax/getNowSales",function(e){var a=(new Date).toTimeString().split(" ")[0],n=o.series[0].data,r=o.series[1].data;a.split(":")[0]<o.xAxis[0].data[9].split(":")[0]&&(n.forEach(function(t,e){n[e]=0}),r.forEach(function(t,e){r[e]=0}),o.xAxis[0].data.forEach(function(t,e){o.xAxis[0].data[e]="昨"+o.xAxis[0].data[e]})),n.shift(),n.push(e.data.total-r[9]),r.shift(),r.push(e.data.total),o.xAxis[0].data.shift(),o.xAxis[0].data.push(a),o.yAxis[0].min=t(r,"min",3),o.yAxis[0].max=t(r,"max",3),o.yAxis[1].min=t(n,"min",2),o.yAxis[1].max=t(n,"max",2),i.myChart1.setOption(o)})},1e3*a)})}function a(){$.post("/ajax/getPeriodSales",{startTime:$(".startTime").datepicker("getDate","yyyy-mm-dd"),endTime:$(".endTime").datepicker("getDate","yyyy-mm-dd")},function(t){i.myChart2&&i.myChart2.clear(),i.myChart2=echarts.init(document.getElementById("periodSales"));var e={title:{text:"总销售额/天(元)"},tooltip:{trigger:"axis"},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},xAxis:{type:"category",boundaryGap:!1,data:t.data.dates},yAxis:{type:"value"},series:[{name:"",type:"line",stack:"总量",data:t.data.sales}]};i.myChart2.setOption(e)})}function n(){var t=$(".oneday").datepicker("getDate","yyyy-mm-dd");$.post("/ajax/getOnedayTable",{date:t},function(e){i.onedayTable&&i.onedayTable.destroy();var a=["<tr>",'<td><a target="_blank" class="prod-name" href="/detail?date='+t+'&id=${productId}&name=${encodeURIComponent(productName)}">${productName}</a></td>',"<td>${(sellAmount/10000).toFixed(0)}</td>","<td>${(financeTotalAmount/10000).toFixed(0)}</td>","<td>${yearReturnRate}</td>","<td>${investementDays}</td>","<td>${interestStartTime}</td>","<td>${interestEndTime}</td>","</tr>"].join("");$.template("onedayTemplate",a),$("#onedayTbody").html($.tmpl("onedayTemplate",e.data.prod)),i.onedayTable=$("#onedayTable").DataTable({order:[[0,"desc"]]})}),$.post("/ajax/getOnedayChart",{date:t},function(t){i.myChart3&&i.myChart3.clear(),i.myChart3=echarts.init(document.getElementById("onedayChart"));var e={title:{text:"销售额/小时(元)"},color:["#3398DB"],tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},xAxis:[{type:"category",data:["1点","2点","3点","4点","5点","6点","7点","8点","9点","10点","11点","12点","13点","14点","15点","16点","17点","18点","19点","20点","21点","22点","23点","24点"],axisTick:{alignWithLabel:!0}}],yAxis:[{type:"value"}],series:[{name:"前一小时销售额",type:"bar",barWidth:"75%",data:t.data.serials}]};i.myChart3.setOption(e)})}var i={},r={autoHide:!0,language:"zh-CN",format:"yyyy-mm-dd",yearFirst:!0,autoPick:!0,startDate:"2017-12-22",endDate:new Date(+new Date-864e5)};$.fn.datepicker.setDefaults(r),$(".datepicker").on("keydown",function(t){t.preventDefault()}),$(".startTime").datepicker({date:new Date(+new Date-864e6)}),$(".endTime").datepicker({date:new Date(+new Date-864e5)}),$(".startTime").on("pick.datepicker",function(t){$(".endTime").datepicker("destroy"),$(".endTime").datepicker({startDate:t.date}),$(".endTime").datepicker("show")}),$(".endTime").on("hide.datepicker",function(t){a()}),e(),$("#selectDelta").change(function(t){e()}),a(),$(".oneday").datepicker({date:new Date(+new Date-864e5)}),n(),$(".oneday").on("pick.datepicker",function(t){n()})});