/* begin copyright text
 *
 * Copyright © 2016 PTC Inc., Its Subsidiary Companies, and /or its Partners. All Rights Reserved.
 *
 * end copyright text
 */
function twx3dTimeSeriesChart() {
  var properties = [
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
      name: 'autoUpdate',
      label: 'ves-basic-web-widgets-extension:Auto Update',
      datatype: 'boolean',
      default: true,
      isVisible: false
    },
    {
      name: 'labelsField',
      label: 'ves-basic-web-widgets-extension:X-axis Field',
      datatype: 'string',
      editor: 'select',
      applyFieldsFromDataSource: 'data',
      default: ''
    },
    {
      name: 'valuesField',
      label: 'ves-basic-web-widgets-extension:Y-axis Field',
      datatype: 'string',
      editor: 'select',
      applyFieldsFromDataSource: 'data',
      default: ''
    },
    {
      name: 'margin',
      label: 'ves-basic-web-widgets-extension:Margin',
      datatype: 'string',
      default: ''
    }
  ];

  properties.push(Twx3dCommon.getPivotProperty());
  properties.push(Twx3dCommon.getWidthProperty());
  properties.push(Twx3dCommon.getHeightProperty());
  var overlay = Twx3dCommon.arrayToMap(properties);
  overlay.experimentalOneSided = Twx3dCommon.getOneSidedProperty();
  overlay.placeholder_img = Twx3dCommon.getPlaceHolderImgProperty('/extensions/images/Bar Chart.png');

  overlay.src = {
    name: 'src',
    label: 'ves-ar-extension:Resource',
    datatype: 'resource_url',
    resource_image: true,
    default: '/extensions/images/Bar Chart.png',
    isBindingTarget: true,
    sortOrder: 1
  };

  var props = Twx3dCommon.new3dProps(overlay);

  var runtimeTemplate = Twx3dCommon.buildRuntimeTemplate('twx-dt-image', props);
  return {
    elementTag: 'twx-3d-time-series-chart',

    label: 'ves-basic-web-widgets-extension:Time Series Chart',

    category: 'ar',

    supports3D: true,

    groups: ['Charts'],

    properties: props,

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
      files: ['js/moment.min.js', 'js/Chart.min.js', 'js/chartjs3d-ng.js'],
      angularModules: ['chartjs-ng']
    },

    designTemplate: function () {
      return Twx3dCommon.buildRuntimeTemplate('twx-dt-image', props);
    },

    runtimeTemplate: function (props) {
      var template2d =
        '<div twx-visible>' +
        '<div ng-hide ng-if="me.data.length" ' +
        'class="chart-size {{me.class}} time-series-chart" ' +
        'style="margin:' + props.margin + ';" ' +
        'cjs-chart ' +
        'image-id="' + props.widgetId + '" ' +
        'auto-update="' + props.autoUpdate + '" ' +
        'chart-type="timeseries" ' +
        'data="me.data" ' +
        'labels-field="{{me.labelsField}}" ' +
        'values-field="{{me.valuesField}}"' +
        'twx-native-events>' +
        '</div>' +
        '</div>';
      var template3d = runtimeTemplate.replace("#widgetId#", props.widgetId).replace('#src#', props.src);
      return template2d + template3d;
    }
  };
}

twxAppBuilder.widget('twx3dTimeSeriesChart', twx3dTimeSeriesChart);
