/* begin copyright text
 *
 * Copyright © 2016 PTC Inc., Its Subsidiary Companies, and /or its Partners. All Rights Reserved.
 *
 * end copyright text
 */
if (typeof module !== 'undefined' && typeof exports !== 'undefined' && module.exports === exports) {
  module.exports = 'chartjs-ng';
}

(function () {
  'use strict';

  var chartDefaultConfigs =
  {
    timeseries: {
      type: 'line',
      data: {},
      options: {
        responsive: false,
        scales: {
          xAxes: [{
            display: true,
            type: 'time',
            time: {
              displayFormats: {
                second: ""
              }
            },
            scaleLabel: {
              display: true,
              labelString: 'Date'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'value'
            }
          }]
        }
      },
    }, bar: {
      type: 'bar',
      data: {},
      options: {
        responsive: false,
        hover: {
          mode: "label"
        },
        scales: {
          xAxes: [{
            type: "category",

            // Specific to Bar Controller
            categoryPercentage: 0.8,
            barPercentage: 0.9,

            // grid line settings
            gridLines: {
              offsetGridLines: true,
            }
          }],
          yAxes: [{
            type: "linear"
          }]
        }
      },
    }
  };

  function convertCsvToArray(list) {
    return list.split(",").map((el) => el.trim());
  }

  function cjsChart(tml3dRenderer) {
    var setConfigData = function (rows, labelsField, valuesFields, colors, labels, fills, showLines, lineTensions) {
      var valuesFieldsArray = convertCsvToArray(valuesFields);
      var labelsArray = convertCsvToArray(labels);
      var colorsArray = convertCsvToArray(colors);
      var fillsArray = convertCsvToArray(fills);
      var showLinesArray = convertCsvToArray(showLines);
      var lineTensionsArray = convertCsvToArray(lineTensions);

      var data = {};
      data.labels = [];
      data.datasets = [];

      var nRows = rows.length;
      for (var i = 0; i < nRows; i++) {
        data.labels.push(rows[i][labelsField]);
      }
      for (let j = 0; j < valuesFieldsArray.length; j++) {
        var dataset = {
          data: [],
          label: labelsArray[j],
          backgroundColor: colorsArray[j],
          fill: fillsArray[j],
          lineTension: lineTensionsArray[j],
          showLine: showLinesArray[j]
        }
        for (var i = 0; i < nRows; i++) {
          dataset.data.push(rows[i][valuesFieldsArray[j]]);
        }
        data.datasets.push(dataset);
      }
      this.data = data;
    };

    var newChartConfig = function (chartType, widgetId, timeFormat) {
      var config = chartDefaultConfigs[chartType];
      config.options.scales.xAxes[0].time.displayFormats.second = timeFormat;
      config.plugins = [{
        // this is where the magic happens where we are transferring the chart onto the 3d Image.
        afterDraw: (chart, options) => {
          tml3dRenderer.setTexture(widgetId, chart.canvas.toDataURL());
        }
      }];
      config.setData = setConfigData;
      return config;
    };

    return {
      restrict: 'EA',
      scope: {
        chartType: '@',
        data: '=',
        labelsField: '@',
        valuesFields: '@',
        timeFormat: '@',
        colors: '@',
        labels: '@',
        fills: '@',
        showLines: '@',
        lineTensions: '@',
        options: '=',
        imageId: "@",
        autoUpdate: '@',
        delegate: '='
      },
      link: function (scope, element, attr) {
        var canvas = scope._canvas = document.createElement("canvas");
        canvas.width = attr.canvasWidth;
        canvas.height = attr.canvasHeight;
        scope._chartConfig = newChartConfig(attr.chartType, attr.imageId, attr.timeFormat);
        scope._chart = new Chart(canvas.getContext('2d'), scope._chartConfig);
        var updateChart = () => {
          var data = scope.data;
          if (data && data.length && scope.labelsField && scope.valuesFields) {
            if (scope.chartType === 'bar') {
              scope._chartConfig.options.scales.xAxes[0].gridLines.display = (scope.options.scales.xAxes[0].gridLines.display === 'true');
              scope._chartConfig.options = scope.options;
            }
            scope._chartConfig.setData(data, scope.labelsField, scope.valuesFields, scope.colors, scope.labels, scope.fills, scope.showLines, scope.lineTensions);
            scope._chart.update();
          }
        };

        var group = ['labelsField', 'valuesFields'];
        if (scope.autoUpdate === 'true') {
          group.push('data.lastUpdated');
        }
        scope.$watchGroup(group, (value) => {
          // if the data last updated is defined
          if (value[2]) {
            updateChart();
          }
        });

        scope.$watch('delegate', function (delegate) {
          if (delegate) {
            delegate.updateChart = updateChart;
          }
        });
      }
    };
  }

  var cjsModule = angular.module('chartjs-ng', []);
  cjsModule.directive('cjsChart', ['tml3dRenderer', cjsChart]);
}());
