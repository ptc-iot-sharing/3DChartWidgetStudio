# Studio 3d chart widgets

This is a package of 3d chart widgets to used in Vuforia Studio. The underlying library used here is [Chart.js](https://www.chartjs.org/).

At the moment, only the timeseries widget is supported.

## Instalation

To use the charts follow the next steps:

* Download the latest version from the [releases page](http://roicentersvn.ptcnet.ptc.com/placatus/Studio3DChartJsWidget/releases).
* Unzip the package under `DOCUMENTS__FOLDER\VuforiaStudio\Extensions`. The end result should be that you have a `index.js` at the folowing path: `VuforiaStudio\Extensions\3dCharts\index.js`.
* Restart Vuforia Studio if already running.

## Usage

The widgets should be visible under the _Charts_ group in the 3D section of Studio.
Starting on version _8.3.5.3961_ the widgets are also visible after being added to the studio canvas. Older version are NOT supported and may lead to studio crashes.

### Timeseries (Line)

The timeseries widget allows displaying points on a line. Often, it is used to show trend data, or the comparison of two data sets.

#### Available properties

| Name | Type | Internal Name | Description
| ---- | -------- | ---- | -----------
| `Data`| `INFOTABLE` | `data` | The dataset used by chart. Can easily come from a Thingworx service. The infotable must contain a column of data for the X axis (timestamp), as well as one or more columns of data for the Y axis.
| `Auto Update` | `BOOLEAN` | `autoUpdate` | If true, the chart will automatically redraw when the data has been updated. Internally, the check is done on the `data.lastUpdated` field of the data property. When using a Thingworx service as the datasource, this is handled automatically.
| `X-axis Field` | `STRING` | `labelField` | Name of the column in the `data` infotable that contains the values for the X-axis.
| `Timestamp Formatting` | `STRING` | `timeFormat` | Specifies how the dates are formatted.
| `Y-axis Fields` | `STRING` | `valuesFields` | A comma-separated list of columns in the `data` infotable that should be dispalyed as lines on the chart.
| `Colors of each line` | `STRING` | `colors` | A comma-separated list of [Colors](http://www.chartjs.org/docs/latest/general/colors.html#colors) for each of the columns mentioned in the `Y-axis Fields` used to draw the lines.
| `Labels of each line` | `STRING` | `lables` | A comma-separated list of values for each of the columns mentioned in the `Y-axis Fields` used to display the legend.
| `Fills` | `STRING` | `fills` | A comma-separated list of [Filling modes](http://www.chartjs.org/docs/latest/charts/area.html#filling-modes) for each of the columns mentioned in the `Y-axis Fields` specifying how to fill the area under the line.
| `Colors of each fill` | `STRING` | `fillColors` | A comma-separated list of [Colors](http://www.chartjs.org/docs/latest/general/colors.html#colors) for each of the columns mentioned in the `Y-axis Fields` used to control the fill.
| `Show Lines` | `BOOLEAN` | `showLines` | A comma-separated list of true/false values for each of the columns mentioned in the `Y-axis Fields`. If false, the line is not drawn.
| `Interpolations` | `NUMBER` | `lineTensions` | A comma-separated list of number values for each of the columns mentioned in the `Y-axis Fields` for the bezier curve tension of the line. Set to 0 to draw straightlines.
| `Title` | `STRING` | `title` | The chart title defines text to draw at the top of the chart.
| `X Axis Label` | `STRING` | `scaleLabelX` | The label of the X axis.
| `Y Axis Label` | `STRING` | `scaleLabelY` | The label of the Y axis.
| `Background Color` | `STRING` | `backgroundColor` | A rgba string for the background color of the chart. Specifyin the alpha channel is required and recommended. A good value for 3D display is between 0.3-0.7.
| `Canvas Height` | `NUMBER` | `canvasheight` | The internal size of the canvas where the chart is drawn. For a higher resolution chart, you can increase this value. Also, if you want to change the aspect ratio you can modify this value. Default Value: `1000`.
| `Canvas Width` | `NUMBER` | `canvaswidth` | The internal size of the canvas where the chart is drawn. For a higher resolution chart, you can increase this value. Also, if you want to change the aspect ratio you can modify this value. Default Value: `1000`;

## Advanced usages

The existing widget only exposes a small subset of the full [Chart.js](https://www.chartjs.org/) capabilities. This is intended to make it easy of anyone to use it. However, if you want to create complex charts, it's possible through the use of javascript.

In javascript, after the chart has been initialised, you can get a reference to it's config like this, then start modifying it. Have a look at the [configuration](http://www.chartjs.org/docs/latest/configuration/) to see what's possible.

``` javascript
var chartScope = angular.element(document.querySelector('[widget-id="timeSeriesChart-2"]  [cjs-chart]')).isolateScope(); // get a reference to the timeSeriesChart-2 widget
chartScope._chartConfig.options.title.text = "The new title!"; // update the config
chartScope._chart.update(); // trigger the update using the new config
```

## Known issues

* ...?