(function() {
  'use strict';

  angular
    .module('madBackWeb')
    .controller('StatisticsCtrl', StatisticsCtrl);

  /** @ngInject */
  function StatisticsCtrl($rootScope, $scope, $state, StatisticsSrv) {
    StatisticsSrv.getStatistics().get()
    .$promise.then(
      function (response) {
        var newData = [];
        response.statistics.forEach(function(obj, i) {
          if (i === 0) {
            newData.push({
              month: (new Date(obj.date)).getMonth() + 1,
              income: obj.totalIncome,
              broadcast: obj.totalBroadcast
            })
          } else {
            newData.forEach(function(o) {
              if ((new Date(obj.date)).getMonth() + 1 === o.month) {
                o.income += obj.totalIncome;
                o.broadcast += obj.totalBroadcast;
              } else {
                newData.push({
                  month: (new Date(obj.date)).getMonth() + 1,
                  income: obj.totalIncome,
                  broadcast: obj.totalBroadcast
                })
              }
            })
          }
        })

        var chart = AmCharts.makeChart("chartdiv", {
          "type": "serial",
          "theme": "light",
          "marginRight": 40,
          "marginLeft": 40,
          "autoMarginOffset": 20,
          "mouseWheelZoomEnabled":true,
          "dataDateFormat": "YYYY-MM-DD",
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
              "lineThickness": 2,
              "title": "red line",
              "useLineColorForBulletBorder": true,
              "valueField": "totalIncome",
              "balloonText": "<span style='font-size:18px;'>[[totalIncome]]</span>"
          }],
          "chartScrollbar": {
              "graph": "g1",
              "oppositeAxis":false,
              "offset":30,
              "scrollbarHeight": 80,
              "backgroundAlpha": 0,
              "selectedBackgroundAlpha": 0.1,
              "selectedBackgroundColor": "#888888",
              "graphFillAlpha": 0,
              "graphLineAlpha": 0.5,
              "selectedGraphFillAlpha": 0,
              "selectedGraphLineAlpha": 1,
              "autoGridCount":true,
              "color":"#AAAAAA"
          },
          "chartCursor": {
              "pan": true,
              "valueLineEnabled": true,
              "valueLineBalloonEnabled": true,
              "cursorAlpha":1,
              "cursorColor":"#258cbb",
              "limitToGraph":"g1",
              "valueLineAlpha":0.2
          },
          "valueScrollbar":{
            "oppositeAxis":false,
            "offset":50,
            "scrollbarHeight":10
          },
          "categoryField": "date",
          "categoryAxis": {
              "parseDates": true,
              "dashLength": 1,
              "minorGridEnabled": true
          },
          "export": {
              "enabled": true
          },
          "dataProvider": response.statistics
      });

      chart.addListener("rendered", zoomChart);

      zoomChart();

      function zoomChart() {
          chart.zoomToIndexes(chart.dataProvider.length - 40, chart.dataProvider.length - 1);
      }

      var chart = AmCharts.makeChart( "incomeChart", {
          "type": "serial",
          "addClassNames": true,
          "theme": "light",
          "autoMargins": false,
          "marginLeft": 30,
          "marginRight": 8,
          "marginTop": 10,
          "marginBottom": 26,
          "balloon": {
              "adjustBorderColor": false,
              "horizontalPadding": 10,
              "verticalPadding": 8,
              "color": "#ffffff"
          },

          "dataProvider": newData,
          "startDuration": 1,
          "graphs": [ {
              "alphaField": "alpha",
              "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span></span>",
              "fillAlphas": 1,
              "title": "Income",
              "type": "column",
              "valueField": "income",
              "dashLengthField": "dashLengthColumn"
          }, {
              "id": "graph2",
              "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span></span>",
              "bullet": "round",
              "lineThickness": 3,
              "bulletSize": 7,
              "bulletBorderAlpha": 1,
              "bulletColor": "#FFFFFF",
              "useLineColorForBulletBorder": true,
              "bulletBorderThickness": 3,
              "fillAlphas": 0,
              "lineAlpha": 1,
              "title": "Broadcast",
              "valueField": "broadcast",
              "dashLengthField": "dashLengthLine"
          } ],
          "categoryField": "month",
          "categoryAxis": {
              "gridPosition": "start",
              "axisAlpha": 0,
              "tickLength": 0
          },
          "export": {
              "enabled": true
          }
        });
      }
    ),
    function (error) {
      console.log(error);
    }
  }

})();
