var version = "1.0.0";

var path = require('path');

exports.extensionInfo = {
  extensionType: 'widget'
};
exports.IDEImages = [
  path.resolve(__dirname, 'ide', 'images', '*')
];

exports.widgetsJS = [
  path.resolve(__dirname, 'widgets', '**', '*.js')
];

exports.widgetsCSS = [
  path.resolve(__dirname, 'widgets', '**', '*.scss')
];


exports.runtimeFiles = function() {
  return [
    {files: [path.resolve(__dirname, 'runtime', 'images', '*')], dest: 'images'},
  ];
}

exports.runtimeAngularModulesRequires = ['tml3dRenderer'];