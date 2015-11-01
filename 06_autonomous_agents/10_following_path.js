/*global console, requestAnimationFrame, Loop, Path, Vehicle*/
//*************************************************
document.addEventListener("DOMContentLoaded", function (event) {
	"use strict";
    var ctx = document.getElementById("canvas").getContext("2d"),
        width = ctx.canvas.width = window.innerWidth,
        height = ctx.canvas.height = window.innerHeight,
        mouseClick = false,
        loop = new Loop(),
        path = new Path(width, height, 4),
        vehicle = new Vehicle(width, height, 0, 0);
                              //Math.random() * width,
                              //Math.random() * height);
    vehicle.mover.velocity.x = Math.random() * 10 - 5;
    vehicle.mover.velocity.y = Math.random() * 10 - 5;
        
    function animate() {
        requestAnimationFrame(animate);
        loop.update();
        var force = vehicle.pathFollowing(path);
        vehicle.applyForce(force);
        vehicle.update();
        ctx.clearRect(0, 0, width, height);
        path.display(ctx);
        vehicle.display(ctx);
        loop.display(ctx);
    }
        
    function move(event) {
        event.preventDefault();
        if (mouseClick === false) { return; }
         
        var x = event.clientX - ctx.canvas.clientLeft,
            y = event.clientY - ctx.canvas.clientTop - 16;
    }
    
    function mouseDown(event) {
        event.preventDefault();
        mouseClick = true;
    }

    function mouseUp(event) {
        event.preventDefault();
        mouseClick = false;
    }
    
	window.requestAnimationFrame(animate);
    
    // attach event listener to the doc
    document.addEventListener("mousedown", mouseDown.bind(this));
    document.addEventListener("mouseup", mouseUp.bind(this));
    document.addEventListener("mousemove", move.bind(this));
    document.addEventListener("touchmove", move.bind(this));
});