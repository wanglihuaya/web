<template>
  <div >
    <div id="container"></div>
  </div>
</template>
<script>
export default {
  mounted() {
    var chartDom = document.getElementById("container");
    var myChart = this.$Echarts.init(chartDom);
    var option;

    var data = [];
    for (let i = 0; i < 5; ++i) {
      data.push(Math.round(Math.random() * 200));
    }

    option = {
      xAxis: {
        max: "dataMax"
      },
      yAxis: {
        type: "category",
        data: ["A", "B", "C", "D", "E"],
        inverse: true,
        animationDuration: 300,
        animationDurationUpdate: 300,
        max: 2 // only the largest 3 bars will be displayed
      },
      series: [
        {
          realtimeSort: true,
          name: "后台管理",
          type: "bar",
          data: data,
          label: {
            show: true,
            position: "right",
            valueAnimation: true
          }
        }
      ],
      legend: {
        show: true
      },
      animationDuration: 0,
      animationDurationUpdate: 3000,
      animationEasing: "linear",
      animationEasingUpdate: "linear"
    };

    function run() {
      var data = option.series[0].data;
      for (var i = 0; i < data.length; ++i) {
        if (Math.random() > 0.9) {
          data[i] += Math.round(Math.random() * 2000);
        } else {
          data[i] += Math.round(Math.random() * 200);
        }
      }
      myChart.setOption(option);
    }

    setTimeout(function() {
      run();
    }, 0);
    setInterval(function() {
      run();
    }, 3000);

    option && myChart.setOption(option);
  }
};
</script>
<style scoped>
#container {
  width: 700px;
  height: 500px;
}
</style>
