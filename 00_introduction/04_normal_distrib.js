document.addEventListener("DOMContentLoaded", function (event) {
    "use strict";
    
    function rnd2() {
        return ((Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random()) - 3) / 3;
    }
    
    var ctx = document.getElementById('canvas').getContext('2d'),
        width = ctx.canvas.width = window.innerWidth,
        height = ctx.canvas.height = window.innerHeight,
        mean = width / 2,
        sd = 50,
        x = 0,
        y = height / 2,
        i = 0;

    ctx.globalAlpha = 3 / 256;
    ctx.strokeRect(0, 0, width, height);
    
    ctx.fillStyle = "#0000ff";
    ctx.fillRect(mean, y - 10, 2, 2);
    ctx.fillRect(mean + sd, y - 10, 2, 2);
    ctx.fillRect(mean - sd, y - 10, 2, 2);

    ctx.strokeStyle = "#ff00ff";
    for (i = 0; i < 1000; i += 1) {
        x = rnd2() * sd + mean;
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.closePath();
        ctx.stroke();
    }
    
    //function animate() {
    //    requestAnimationFrame(animate);
    //}
	// window.requestAnimationFrame(animate);
});
