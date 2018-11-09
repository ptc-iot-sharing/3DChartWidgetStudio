/* begin copyright text
 *
 * Copyright © 2016 PTC Inc., Its Subsidiary Companies, and /or its Partners. All Rights Reserved.
 *
 * end copyright text
 */
function twx3dTimeSeriesChart() {
  var properties = [
    {
      name: 'data',
      label: 'ves-basic-web-widgets-extension:Data',
      datatype: 'infotable',
      isBindingTarget: true,
      sortOrder: 1
    },
    {
      name: 'autoUpdate',
      label: 'ves-basic-web-widgets-extension:Auto Update',
      datatype: 'boolean',
      default: true,
      isVisible: true,
      sortOrder: 2
    },
    {
      name: 'labelField',
      label: 'ves-basic-web-widgets-extension:X-axis Field',
      datatype: 'string',
      editor: 'select',
      applyFieldsFromDataSource: 'data',
      default: '',
      sortOrder: 3
    },
    {
      name: 'timeFormat',
      label: 'ves-basic-web-widgets-extension:Timestamp formatting',
      datatype: 'string',
      default: 'MM D YYYY HH:mm:ss',
      sortOrder: 4
    },
    {
      name: 'valuesFields',
      label: 'ves-basic-web-widgets-extension:Y-axis Fields (comma separated)',
      datatype: 'string',
      default: '',
      sortOrder: 5
    },
    {
      name: 'colors',
      label: 'ves-basic-web-widgets-extension:Colors of each line (comma separated)',
      datatype: 'string',
      sortOrder: 6
    },
    {
      name: 'labels',
      label: 'ves-basic-web-widgets-extension:Labels of each line (comma separated)',
      datatype: 'string',
      sortOrder: 7
    },
    {
      name: 'fills',
      label: 'ves-basic-web-widgets-extension:Fills (comma separated, see http://www.chartjs.org/docs/latest/charts/area.html)',
      datatype: 'string',
      sortOrder: 8
    },
    {
      name: 'fillColors',
      label: 'ves-basic-web-widgets-extension:Colors of each fill (comma separated)',
      datatype: 'string',
      sortOrder: 8
    },
    {
      name: 'showLines',
      label: 'ves-basic-web-widgets-extension:ShowLines (comma separated)',
      datatype: 'string',
      sortOrder: 9
    },
    {
      name: 'lineTensions',
      label: 'ves-basic-web-widgets-extension:Interpolations (comma separated)',
      datatype: 'string',
      sortOrder: 10
    },
    {
      name: 'title',
      label: 'ves-basic-web-widgets-extension:Chart Title',
      datatype: 'string',
      sortOrder: 11
    },
    {
      name: 'scaleLabelX',
      label: 'ves-basic-web-widgets-extension:X Axis Label',
      datatype: 'string',
      default: 'Timestamp',
      sortOrder: 12
    },
    {
      name: 'scaleLabelY',
      label: 'ves-basic-web-widgets-extension:Y Axis Label',
      datatype: 'string',
      default: 'Value',
      sortOrder: 13
    },
    {
      name: 'backgroundColor',
      label: 'ves-basic-web-widgets-extension:Background Color (RGBA ONLY)',
      datatype: 'string',
      default: 'rgba(0, 0, 0, 0.3)',
      sortOrder: 14
    },
    {
      name: 'canvasheight',
      label: 'Canvas Height',
      datatype: 'number',
      default: 1000,
      isBindingTarget: true,
      alwaysWriteAttribute: true
    },
    {
      name: 'canvaswidth',
      label: 'Canvas Width',
      datatype: 'number',
      default: 1000,
      isBindingTarget: true,
      alwaysWriteAttribute: true
    },
    {
      name: 'src',
      label: 'ves-ar-extension:Resource',
      datatype: 'string',
      default: '/extensions/images/sample_image.png',
      isVisible: false
    }
  ];

  properties.push(Twx3dCommon.getPivotProperty());
  properties.push(Twx3dCommon.getWidthProperty());
  properties.push(Twx3dCommon.getHeightProperty());
  var overlay = Twx3dCommon.arrayToMap(properties);
  overlay.experimentalOneSided = Twx3dCommon.getOneSidedProperty();
  overlay.placeholder_img = Twx3dCommon.getPlaceHolderImgProperty('/extensions/images/sample_image.png');

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
      files: ['js/moment.min.js', 'js/Chart.min.js', 'js/chartjs3d-ng.js', 'images/sample_image.png'],
      angularModules: ['chartjs-ng']
    },

    designTemplate: function () {
      return Twx3dCommon.buildRuntimeTemplate('twx-dt-image', props);
    },

    runtimeTemplate: function (props) {
      var template2d =
        '<div ng-hide ng-if="me.data.length" ' +
        'cjs-chart ' +
        'image-id="' + props.widgetId + '" ' +
        'canvas-height="' + props.canvasheight + '" ' +
        'canvas-width="' + props.canvaswidth + '" ' +
        'auto-update="' + props.autoUpdate + '" ' +
        'chart-type="timeseries" ' +
        'data="me.data" ' +
        'labels-field="{{me.labelField}}" ' +
        'values-fields="{{me.valuesFields}}"' +
        'time-format="{{me.timeFormat}}"' +
        'colors="{{me.colors}}"' +
        'labels="{{me.labels}}"' +
        'fills="{{me.fills}}"' +
        'fill-colors="{{me.fillColors}}"' +
        'show-lines="{{me.showLines}}"' +
        'line-tensions="{{me.lineTensions}}"' +
        'title="{{me.title}}" ' +
        'scale-label-x="{{me.scaleLabelX}}" ' +
        'scale-label-y="{{me.scaleLabelY}}" ' +
        'background-color="{{me.backgroundColor}}" ' +
        'twx-native-events>' +
        '</div>';
      var template3d = runtimeTemplate.replace("#widgetId#", props.widgetId).replace('#src#', props.src);
      return template2d + template3d;
    }
  };
}

twxAppBuilder.widget('twx3dTimeSeriesChart', twx3dTimeSeriesChart);
