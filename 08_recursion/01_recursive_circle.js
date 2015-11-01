/*global requestAnimationFrame, MouseEvtListener, Loop, drawCircle, cantor, Kochcurve, Vector2*/
//*************************************************
document.addEventListener("DOMContentLoaded", function (event) {
	"use strict";
    var ctx = document.getElementById("canvas").getContext("2d"),
        width = ctx.canvas.width = window.innerWidth,
        height = ctx.canvas.height = window.innerHeight,
        loop = new Loop(),
        center = new Vector2(width / 2, height / 2),
        r = Math.min(width, height) / 2 - 20,
        p1 = Vector2.fromPolar(r, 2 * Math.PI / 3).addInPlace(center),
        p2 = Vector2.fromPolar(r, 4 * Math.PI / 3).addInPlace(center),
        p3 = Vector2.fromPolar(r, 0).addInPlace(center),
        flake1 = new Kochcurve(p2, p1),
        flake2 = new Kochcurve(p3, p2),
        flake3 = new Kochcurve(p1, p3);

    
    function animate() {
        requestAnimationFrame(animate);

        ctx.clearRect(0, 0, width, height);
        //drawCircle(ctx, width / 2, height / 2, width);
        //cantor(ctx, 0, 0, width);
        flake1.display(ctx);
        flake2.display(ctx);
        flake3.display(ctx);
        
        var delta = loop.update();
        loop.display(ctx);
    }
    
	window.requestAnimationFrame(animate);
});

var drawCircle = function (ctx, x, y, radius) {
    "use strict";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();
    
    if (radius > 1) {
        radius *= 0.25;
        drawCircle(ctx, x + radius, y, radius);
        drawCircle(ctx, x - radius, y, radius);
        drawCircle(ctx, x, y + radius, radius);
        drawCircle(ctx, x, y - radius, radius);
    }
};

var cantor = function (ctx, x, y, len) {
    "use strict";
    var height = 40;
    ctx.beginPath();
    ctx.fillRect(x, y, len, height);
    //ctx.stroke();
    ctx.closePath();
    
    if (len > 1) {
        y += height * 2;
        len /= 3;
        cantor(ctx, x, y, len);
        cantor(ctx, x + 2 * len, y, len);
    }
};