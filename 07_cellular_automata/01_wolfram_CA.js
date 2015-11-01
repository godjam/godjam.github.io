/*global console, requestAnimationFrame, MouseEvtListener, Loop, Vector2, CA*/
//*************************************************
document.addEventListener("DOMContentLoaded", function (event) {
	"use strict";
    var ctx = document.getElementById("canvas").getContext("2d"),
        width = ctx.canvas.width = window.innerWidth,
        height = ctx.canvas.height = window.innerHeight,
        listener = new MouseEvtListener(ctx.canvas.clientLeft, ctx.canvas.clientTop),
        loop = new Loop(),
        ca = new CA(width / 20, width, height);
    ca.generate();
    
    function animate() {
        requestAnimationFrame(animate);
        var delta = loop.update();
        //ca.update(delta);
        ctx.clearRect(0, 0, width, height);
        loop.display(ctx);
        ca.display(ctx);
        //console.log(listener.getPosition().x, listener.getPosition().y);
    }
    
	window.requestAnimationFrame(animate);
});