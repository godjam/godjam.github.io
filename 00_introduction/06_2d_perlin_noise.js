/*global noise */

document.addEventListener("DOMContentLoaded", function (event) {
    "use strict";
    
    var ctx = document.getElementById('canvas').getContext('2d'),
        width = ctx.canvas.width = window.innerWidth,
        height = ctx.canvas.height = window.innerHeight,
        x = 0,
        y = 0,
        bright = 0,
        image = ctx.getImageData(0, 0, width, height),
        data = image.data,
        index = 0;
    
    for (x = 0; x < width; x += 1) {
        for (y = 0; y < height; y += 1) {
            bright = Math.abs(noise.perlin2(x / 100, y / 100));
            bright *= 255;
            //console.log(bright);
            index = (x + y * width) * 4;
            data[index] = data[index + 1] = data[index + 2] = bright;
            data[index + 3] = 255;
        }
    }
    
    ctx.putImageData(image, 0, 0);
    
    
});
