module.exports = function Noise(pixels, method) {
  let neighbourX = [-1, -1, -1, 0, 0, 0, 1, 1, 1];
  let neighbourY = [-1, 0, 1, -1, 0, 1, -1, 0, 1];

  if(method == 'Median Filtering'){

    for(let y = 0; y < pixels.shape[1]; y++){
      for(let x = 0; x < pixels.shape[0]; x++){
        let i = 0, k = 0, windowr = [],windowg = [], windowb = [];

        while( k <= 8){
          let newX = x + neighbourX[k], newY = y + neighbourY[k];
  
          if( newX >= 0 && newX < pixels.shape[0])
          {
            if( newY >= 0 && newY < pixels.shape[1]){
              windowr[i] = pixels.get((newX),(newY),0);
              windowg[i] = pixels.get((newX),(newY),1);
              windowb[i] = pixels.get((newX),(newY),2);
              i++;
            }
          }
          k++;
        }

        windowr.sort();
        windowg.sort();
        windowb.sort();
        
        if(i%2 == 0)
        {
          let value = windowr[i/2] + windowr[(i/2)-1];
          pixels.set(x,y,0,value);

          value = windowg[i/2] + windowg[(i/2)-1];
          pixels.set(x,y,1,value);

          value = windowb[i/2] + windowb[(i/2)-1];
          pixels.set(x,y,2,value);

        }
        else {
          pixels.set(x, y, 0, windowr[Math.floor(i/2)]);
          pixels.set(x, y, 1, windowg[Math.floor(i/2)]);
          pixels.set(x, y, 2, windowb[Math.floor(i/2)]);

        }
      }
    }
  }
  else if(method == 'Mean Filtering'){
    
    for(let y = 0; y < pixels.shape[1]; y++){
      for(let x = 0; x < pixels.shape[0]; x++){
        let i = 0, k = 0, sumR=0, sumG = 0, sumB =0;

        while( k <= 8){
          let newX = x + neighbourX[k], newY = y + neighbourY[k];

          if( newX >= 0 && newX < pixels.shape[0])
          {
            if( newY >= 0 && newY < pixels.shape[1]){
              sumR += pixels.get(newX,newY,0);
              sumG += pixels.get(newX,newY,1);
              sumB += pixels.get(newX,newY,2);
              i++;
            }
          }
          k++;
        }

        pixels.set(x, y, 0, sumR/i);
        pixels.set(x, y, 1, sumG/i);
        pixels.set(x, y, 2, sumB/i);

      }
    }
  }
  
  return pixels;
};