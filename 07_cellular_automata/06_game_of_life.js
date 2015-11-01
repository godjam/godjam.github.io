/*global console, requestAnimationFrame, MouseEvtListener, Loop, Vector2, CA2D, CA2DHex, CA2DProbabilistic, CA2DContinuous*/
//*************************************************
document.addEventListener("DOMContentLoaded", function (event) {
	"use strict";
    var ctx = document.getElementById("canvas").getContext("2d"),
        width = ctx.canvas.width = window.innerWidth,
        height = ctx.canvas.height = window.innerHeight,
        loop = new Loop(),
        ca = new CA2DContinuous(80, width, height),
        listener = new MouseEvtListener(ctx.canvas.clientLeft, ctx.canvas.clientTop, ca, ca.addCell);
    
    function animate() {
        requestAnimationFrame(animate);
        var delta = loop.update();
        ca.update();
        ctx.clearRect(0, 0, width, height);
        ca.display(ctx);
        loop.display(ctx);
        //console.log(listener.getPosition().x, listener.getPosition().y);
    }
    
	window.requestAnimationFrame(animate);
});