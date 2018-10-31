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
  ];
}

exports.runtimeAngularModulesRequires = ['tml3dRenderer'];