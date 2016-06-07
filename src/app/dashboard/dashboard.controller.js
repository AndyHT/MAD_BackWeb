(function() {
  'use strict';

  angular
    .module('madBackWeb')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($rootScope, $scope, $state, DashboardSrv) {
    DashboardSrv.getDashboardData().get()
    .$promise.then(
      function (response) {
        // console.log(response);
        // 总量和昨日投放量
        var last = response.advert_detail7.reverse().slice(0, 7);
        $scope.data = {
          totalBroadcastTimes: response.totalBroadcastTimes,
          totalAdvertisement: response.totalAdvertisement,
          totalAdvertiser: response.totalAdvertiser,
          totalUser: response.totalUser,
          lastDayBroadcast: last[0].totalBroadcastTimes,
          rate: (last[0].totalBroadcastTimes - last[1].totalBroadcastTimes) / last[0].totalBroadcastTimes
        };
        // 广告排放量前三
        var advert_most = [];
        for (var i = 0; i < response.advert_most.length; i++) {
          for (var j = i + 1; j < response.advert_most.length; j++) {
            if (response.advert_most[j].broadcastSum > response.advert_most[i].broadcastSum) {
              var temp = response.advert_most[i];
              response.advert_most[i] = response.advert_most[j];
              response.advert_most[j] = temp;
            }
          }
        }
        for (var i = 0; i < response.advert_most.length; i++) {
          response.advert_most[i].rank = 'Top' + (i + 1);
        }

        // 最近一周广告投放和最近一周收入统计
        var weekData = response.advert_detail7.reverse().slice(0, 7);
        var day = ['Sun', 'Mon', 'Tue', 'Web', 'Thu', 'Fri', 'Sat'];
        for (var i = 0; i < weekData.length; i++) {
          weekData[i].week = day[(new Date(weekData[i].date).getDay())];
        }
        // $scope.data = {
        //   lastDayBroadcast: weekData[0].totalBroadcastTimes,
        //   rate: (weekData[0].totalBroadcastTimes - weekData[1].totalBroadcastTimes) / weekData[0].totalBroadcastTimes
        // }
        // if (weekData[1].totalBroadcastTimes) {
        //   $scope.data = {
        //     rate: (weekData[0].totalBroadcastTimes - weekData[1].totalBroadcastTimes) / weekData[0].totalBroadcastTimes
        //   }
        // }
        weekData.reverse();

        //第二排第三个图
        var chart_week_income = AmCharts.makeChart("mob-desktop", {
          "type": "serial",
          "theme": "light",
          "dataProvider": weekData,
          "valueAxes": [ {
            "gridColor": "#FFFFFF",
            "gridAlpha": 0.2,
            "dashLength": 0
          } ],
          "gridAboveGraphs": true,
          "startDuration": 1,
          "graphs": [ {
            "balloonText": "[[date]]</br>[[category]]: <b>[[value]]</b>",
            "fillAlphas": 0.8,
            "lineAlpha": 0.2,
            "type": "column",
            "valueField": "totalIncome"
          } ],
          "chartCursor": {
            "categoryBalloonEnabled": false,
            "cursorAlpha": 0,
            "zoomable": false
          },
          "categoryField": "week",
          "categoryAxis": {
            "gridPosition": "start",
            "gridAlpha": 0,
            "tickPosition": "start",
            "tickLength": 0,
            "dashLength":0
          },
          "export": {
            "enabled": true
          }

        })

        //第二排第二个图
        var chart_top_rank = AmCharts.makeChart( "mobVsDesk", {
          "type": "pie",
          "theme": "light",
          "dataProvider": response.advert_most,
          "titleField": "rank",
          "valueField": "broadcastSum",
          "labelRadius": 5,

          "radius": "46%",
          "innerRadius": "60%",
          "labelText": "[[title]]",
          "export": {
            "enabled": true
          }
        } );

        //第二排第一个图
        var chart_week_delivery = AmCharts.makeChart("area-chart", {
          "type": "serial",
          "theme": "light",
          "marginRight": 30,
          "marginLeft": 50,
          "autoMarginOffset": 10,
          "mouseWheelZoomEnabled":true,
          // "dataDateFormat": "YYYY-MM-DD",
          "valueAxes": [{
            "id": "v1",
            "axisAlpha": 0,
            "position": "left",
            "ignoreAxisWidth":true
          }],
          "balloon": {
            "borderThickness": 1,
            "shadowAlpha": 0
          },
          "graphs": [{
            "id": "g1",
            "balloon":{
              "drop":true,
              "adjustBorderColor":false,
              "color":"#ffffff"
            },
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "bulletColor": "#FFFFFF",
            "bulletSize": 5,
            "hideBulletsCount": 50,
            "useLineColorForBulletBorder": true,

            "lineThickness": 2,
            "title": "red line",
            "valueField": "totalBroadcastTimes",
            "balloonText": "[[date]]</br><span style='font-size:18px;'>[[value]]</span>"
          }],

          "chartCursor": {
            "pan": true,
            "valueLineEnabled": true,
            "valueLineBalloonEnabled": true,
            "cursorAlpha":1,
            "cursorColor":"#258cbb",
            "limitToGraph":"g1",
            "valueLineAlpha":0.2
          },

          "categoryField": "week",
          "categoryAxis": {
            "dashLength": 1,
            "minorGridEnabled": true
          },
          "export": {
            "enabled": true
          },
          "dataProvider": weekData
        });

        //第三排download图
        var chart = AmCharts.makeChart( "downloadChart", {
          "type": "serial",
          "theme": "default",
          "dataProvider": [ {
            "date": "3-6",
            "value": 2025
          }, {
            "date": "3-13",
            "value": 1882
          }, {
            "date": "3-20",
            "value": 1809
          }, {
            "date": "3-27",
            "value": 1322
          }, {
            "date": "4-3",
            "value": 1122
          }, {
            "date": "4-10",
            "value": 1114
          }, {
            "date": "4-13",
            "value": 584
          } ],
          "valueAxes": [ {
            "gridColor": "#FFFFFF",
            "gridAlpha": 0.2,
            "dashLength": 0
          } ],
          "gridAboveGraphs": true,
          "startDuration": 1,
          "graphs": [ {
            "balloonText": "[[category]]: <b>[[value]]</b>",
            "fillAlphas": 0.8,
            "lineAlpha": 0.2,
            "type": "column",
            "valueField": "value"
          } ],
          "chartCursor": {
            "categoryBalloonEnabled": false,
            "cursorAlpha": 0,
            "zoomable": false
          },
          "categoryField": "date",
          "categoryAxis": {
            "gridPosition": "start",
            "gridAlpha": 0,
            "tickPosition": "start",
            "tickLength": 0
          },
          "export": {
            "enabled": true
          }

        } );



        chart_week_delivery.addListener("rendered", zoomChart);

        zoomChart();

        function zoomChart() {
          chart_week_delivery.zoomToIndexes(chart.dataProvider.length - 40, chart.dataProvider.length - 1);
        }

      },
      function (error) {
        console.log(error);
      }
    )

  }
})();
