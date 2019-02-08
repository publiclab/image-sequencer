var _ = require('lodash');
module.exports = exports = function(pixels, constantFactor, kernelValues){
	let kernel = kernelGenerator(constantFactor, kernelValues), oldpix = _.cloneDeep(pixels);
	kernel = flipKernel(kernel);

	for (let i = 0; i < pixels.shape[0]; i++) {
        for (let j = 0; j < pixels.shape[1]; j++) {
            let neighboutPos = getNeighbouringPixelPositions([i, j]);
            let acc = [0.0, 0.0, 0.0, 0.0];
            for (let a = 0; a < kernel.length; a++) {
                for (let b = 0; b < kernel.length; b++) {
                    acc[0] += (oldpix.get(neighboutPos[a][b][0], neighboutPos[a][b][1], 0) * kernel[a][b]);
                    acc[1] += (oldpix.get(neighboutPos[a][b][0], neighboutPos[a][b][1], 1) * kernel[a][b]);
                    acc[2] += (oldpix.get(neighboutPos[a][b][0], neighboutPos[a][b][1], 2) * kernel[a][b]);
                    acc[3] += (oldpix.get(neighboutPos[a][b][0], neighboutPos[a][b][1], 3) * kernel[a][b]);
                }
            }
            acc[0] = acc[0]%255;
            acc[1] = acc[1]%255;
            acc[2] = acc[2]%255;
            pixels.set(i, j, 0, acc[0]);
            pixels.set(i, j, 1, acc[1]);
            pixels.set(i, j, 2, acc[2]);
        }
    }
    return pixels;


	function kernelGenerator(constantFactor, kernelValues){
		kernelValues = kernelValues.split(" ");
        for(i = 0 ; i < 9; i++){
            kernelValues[i] = Number(kernelValues[i]) * constantFactor;
        }
        let k = 0;
		let arr = [];
		for(i = 0; i < 3; i++){
			let columns = [];
			for(j = 0; j < 3; j++){
				columns.push(kernelValues[k]);
				k += 1;
			}
			arr.push(columns);
		}
		return arr;
	}

	function getNeighbouringPixelPositions(pixelPosition) {
        let x = pixelPosition[0], y = pixelPosition[1], result = [];

        for (let i = -1; i <= 1; i++) {
            let arr = [];
            for (let j = -1; j <= 1; j++)
                arr.push([x + i, y + j]);

            result.push(arr);
        }
        return result;
    }

	function flipKernel(kernel) {
        let result = [];
        for (let i = kernel.length - 1; i >= 0; i--) {
            let arr = [];
            for (let j = kernel[i].length - 1; j >= 0; j--) {
                arr.push(kernel[i][j]);
            }
            result.push(arr);
        }
        return result;
    }
}