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
      animation: {
        duration: 0
      },
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
          }],
          yAxes: [{
            display: true,
          }]
        }
      },
    }, bar: {
      type: 'bar',
      data: {},
      options: {
        responsive: false,
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

  function convertCsvToArray(list, repeatCount) {
    var result = list.split(",").map((el) => el.trim());
    if (result.length == 1 && repeatCount) {
      result = Array(repeatCount).fill(list.trim());
    }
    return result;
  }

  function cjsChart(tml3dRenderer) {
    var setConfigData = function (rows, labelsField, valuesFields, colors, labels, fills, fillColors, showLines, lineTensions) {
      var valuesFieldsArray = convertCsvToArray(valuesFields);
      var labelsArray = convertCsvToArray(labels);
      var colorsArray = convertCsvToArray(colors, valuesFieldsArray.length);
      var fillsArray = convertCsvToArray(fills, valuesFieldsArray.length);
      var fillColorsArray = convertCsvToArray(fillColors, valuesFieldsArray.length);
      var showLinesArray = convertCsvToArray(showLines, valuesFieldsArray.length);
      var lineTensionsArray = convertCsvToArray(lineTensions, valuesFieldsArray.length);

      var data = {
        labels: [],
        datasets: []
      };

      for (var i = 0; i < rows.length; i++) {
        data.labels.push(rows[i][labelsField]);
      }

      for (let j = 0; j < valuesFieldsArray.length; j++) {
        var dataset = {
          data: [],
          label: labelsArray[j],
          backgroundColor: fillColorsArray[j],
          borderColor: colorsArray[j],
          fill: fillsArray[j] == 'false' ? false : fillsArray[j], // see http://www.chartjs.org/docs/latest/charts/area.html
          lineTension: parseFloat(lineTensionsArray[j]),
          showLine: showLinesArray[j] == 'true'
        };
        for (var i = 0; i < rows.length; i++) {
          dataset.data.push(rows[i][valuesFieldsArray[j]]);
        }
        data.datasets.push(dataset);
      }
      this.data = data;
    };

    function newChartConfig(chartType, widgetId, timeFormat, title, scaleLabelX, scaleLabelY, backgroundColor) {
      var config = chartDefaultConfigs[chartType];
      config.options.scales.xAxes[0].time.displayFormats.second = timeFormat;
      config.plugins = [{
        // this is where the magic happens where we are transferring the chart onto the 3d Image.
        afterRender: (chart, options) => {
          tml3dRenderer.setTexture(widgetId, chart.canvas.toDataURL());
        }
      }];
      if (backgroundColor) {
        config.plugins.push({
          beforeDraw: (chart) => {
            var ctx = chart.canvas.getContext('2d');
            var colorComponents = backgroundColor.split(',');
            // we have an alpha parameter
            if (colorComponents[3]) {
              ctx.globalAlpha = parseFloat(colorComponents[3].trim());
            }
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, chart.canvas.width, chart.canvas.height);
            ctx.globalAlpha = 1;
            ctx.restore();
          }
        })
      }
      if (title) {
        config.options.title = {
          display: true,
          text: title
        }
      }
      if (scaleLabelX) {
        config.options.scales.xAxes[0].scaleLabel = {
          display: true,
          labelString: scaleLabelX
        }
      }
      if (scaleLabelY) {
        config.options.scales.yAxes[0].scaleLabel = {
          display: true,
          labelString: scaleLabelY
        }
      }
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
        fillColors: '@',
        showLines: '@',
        lineTensions: '@',
        title: '@',
        scaleLabelX: '@',
        scaleLabelY: '@',
        backgroundColor: '@',
        options: '=',
        imageId: "@",
        autoUpdate: '@',
        delegate: '='
      },
      link: function (scope, element, attr) {
        var canvas = scope._canvas = document.createElement("canvas");
        canvas.width = attr.canvasWidth;
        canvas.height = attr.canvasHeight;
        scope._chartConfig = newChartConfig(attr.chartType, attr.imageId, attr.timeFormat, attr.title, attr.scaleLabelX, attr.scaleLabelY, attr.backgroundColor);
        scope._chart = new Chart(canvas.getContext('2d'), scope._chartConfig);
        var updateChart = () => {
          var data = scope.data;
          if (data && data.length && scope.labelsField && scope.valuesFields) {
            if (scope.chartType === 'bar') {
              scope._chartConfig.options.scales.xAxes[0].gridLines.display = (scope.options.scales.xAxes[0].gridLines.display === 'true');
              scope._chartConfig.options = scope.options;
            }
            scope._chartConfig.setData(data, scope.labelsField, scope.valuesFields, scope.colors, scope.labels, scope.fills, scope.fillColors, scope.showLines, scope.lineTensions);
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
