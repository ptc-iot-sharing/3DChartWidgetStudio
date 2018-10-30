/* begin copyright text
 *
 * Copyright © 2016 PTC Inc., Its Subsidiary Companies, and /or its Partners. All Rights Reserved.
 *
 * end copyright text
 */
function twxBarChart() {
  return {
    elementTag: 'twx-bar-chart',

    label: 'ves-basic-web-widgets-extension:Bar Chart',

    category: 'basic-html',

    properties: [
      {
        name: 'class',
        label: 'ves-basic-web-widgets-extension:Class',
        datatype: 'string',
        //default: '',
        isBindingTarget: true
      },
      {
        name: 'data',
        label: 'ves-basic-web-widgets-extension:Data',
        datatype: 'infotable',
        isBindingTarget: true
      },
      {
        name: 'labelsField',
        label: 'ves-basic-web-widgets-extension:X-axis Field',
        datatype: 'string',
        editor: 'select',
        applyFieldsFromDataSource: 'data',
        default: '',
        isBindingTarget: true
      },
      {
        name: 'valuesField',
        label: 'ves-basic-web-widgets-extension:Y-axis Field',
        datatype: 'string',
        editor: 'select',
        applyFieldsFromDataSource: 'data',
        default: '',
        isBindingTarget: true
      },
      {
        name: 'autoUpdate',
        label: 'ves-basic-web-widgets-extension:Auto Update',
        datatype: 'boolean',
        default: true,
        isVisible: false
      },
      {
        name: 'visible',
        label: 'ves-basic-web-widgets-extension:Visible',
        datatype: 'boolean',
        default: true,
        isBindingTarget: true
      },
      {
        name: 'chartOptions',
        label: 'ves-basic-web-widgets-extension:Chart Options',
        datatype: 'json',
        alwaysWriteAttribute: true,
        default: {
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
                display: false,
              }
            }],
            yAxes: [{
              type: "linear"
            }]
          }
        },
        isVisible: false
      },
      {
        name: 'chartOptionsConfig',
        label: 'ves-basic-web-widgets-extension:Chart Options',
        datatype: 'custom_ui',
        buttonLabel: 'Configure',
        title: 'ves-basic-web-widgets-extension:Chart Options',
        template: function () {
          return '<cjs-chart-configurator chart-type="bar"></cjs-chart-configurator>';
        }
      }
    ],

    services: [
      {
        name: 'updateChart',
        label: 'ves-basic-web-widgets-extension:Update Chart'
      }
    ],

    events: [
      {
        name: 'click',
        label: 'ves-basic-web-widgets-extension:Click'
      }
    ],

    dependencies: {
      files: ['js/moment.min.js', 'js/Chart.min.js', 'js/chartjs-ng.js'],
      angularModules: ['chartjs-ng']
    },

    designTemplate: function () {
      return '<div class="chart-placeholder {{me.class}} bar-chart">' +
          '<p class="chart-placeholder-text">{{::"ves-basic-web-widgets-extension:Bar Chart" | i18next}}</p></div>';
    },

    runtimeTemplate: function (props) {
      var tmpl =
        '<div twx-visible>' +
          '<div class="chart-placeholder {{me.class}} bar-chart" ng-if="!me.data.length">' +
            '<p class="chart-placeholder-text">Data is not loaded yet.</p>' +
          '</div>' +
          '<div ng-if="me.data.length" ' +
            'cjs-chart ' +
            'chart-type="bar" ' +
            'data="me.data" ' +
            'labels-field="{{me.labelsField}}" ' +
            'values-field="{{me.valuesField}}" ' +
            'class="chart-size {{me.class}} bar-chart" ' +
            'auto-update="' + props.autoUpdate + '" ' +
            'options="me.chartOptions" ' +
            'delegate="delegate" ' +
            'twx-native-events>' +
          '</div>' +
        '</div>';
      return tmpl;
    }
  };
}

twxAppBuilder.widget('twxBarChart', twxBarChart);
