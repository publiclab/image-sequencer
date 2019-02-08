/*
 * Sample Meta Module for demonstration purpose only
 */
module.exports = function NdviColormapfunction() {
    this.expandSteps([{ 'name': 'ndvi', 'options': {} }, { 'name': 'colormap', options: {} }]);
    return {
        isMeta: true
    }
}