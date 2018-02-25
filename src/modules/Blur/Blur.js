module.exports = exports = function(pixels,blur){
    let kernel = kernelGenerator(blur,1)
    kernel = flipKernel(kernel)
    var oldpix = pixels
    
    for(let i=0;i<pixels.shape[0];i++){
        for(let j=0;j<pixels.shape[1];j++){
            let neighboutPos = getNeighbouringPixelPositions([i,j])
            let acc = [0.0,0.0,0.0,0.0]
            for(let a = 0; a < kernel.length; a++){
                for(let b = 0; b < kernel.length; b++){
                    acc[0] += (oldpix.get(neighboutPos[a][b][0],neighboutPos[a][b][1],0) * kernel[a][b]);
                    acc[1] += (oldpix.get(neighboutPos[a][b][0],neighboutPos[a][b][1],1) * kernel[a][b]);
                    acc[2] += (oldpix.get(neighboutPos[a][b][0],neighboutPos[a][b][1],2) * kernel[a][b]);
                    acc[3] += (oldpix.get(neighboutPos[a][b][0],neighboutPos[a][b][1],3) * kernel[a][b]);
                }
            }
            pixels.set(i,j,0,acc[0])
            pixels.set(i,j,1,acc[1])
            pixels.set(i,j,2,acc[2])
        }
    }
    return pixels
    
    
    
    //Generates a 3x3 Gaussian kernel
    function kernelGenerator(sigma,size){

        /* 
        Trying out a variable radius kernel not working as of now
        */
        // const coeff = (1.0/(2.0*Math.PI*sigma*sigma))
        // const expCoeff = -1 * (1.0/2.0 * sigma * sigma)
        // let e = Math.E
        // let result = []
        // for(let i = -1 * size;i<=size;i++){
        //     let arr = []
        //     for(let j= -1 * size;j<=size;j++){
        //         arr.push(coeff * Math.pow(e,expCoeff * ((i * i) + (j*j))))
        //     }
        //     result.push(arr)
        // }
        // let sum = result.reduce((sum,val)=>{
        //     return val.reduce((sumInner,valInner)=>{
        //         return sumInner+valInner
        //     })
        // })
        // result = result.map(arr=>arr.map(val=>(val + 0.0)/(sum + 0.0)))
        
        // return result
        
        return [
            [2.0/159.0,4.0/159.0,5.0/159.0,4.0/159.0,2.0/159.0],
            [4.0/159.0,9.0/159.0,12.0/159.0,9.0/159.0,4.0/159.0],
            [5.0/159.0,12.0/159.0,15.0/159.0,12.0/159.0,5.0/159.0],
            [4.0/159.0,9.0/159.0,12.0/159.0,9.0/159.0,4.0/159.0],
            [2.0/159.0,4.0/159.0,5.0/159.0,4.0/159.0,2.0/159.0]
        ]
    }
    function getNeighbouringPixelPositions(pixelPosition){
        let x = pixelPosition[0],y=pixelPosition[1]
        let result = []
        for(let i=-2;i<=2;i++){
            let arr = []
            for(let j=-2;j<=2;j++){
                arr.push([x + i,y + j])
            }
            result.push(arr)
        }
    return result
}

function flipKernel(kernel){
    let result = []
    for(let i =kernel.length-1;i>=0;i--){
        let arr = []
        for(let j = kernel[i].length-1;j>=0;j--){
            arr.push(kernel[i][j])
        }
        result.push(arr)
    }
    return result
}
}