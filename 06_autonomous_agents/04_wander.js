/*global console, requestAnimationFrame, Vehicle, Vector2, Array2D, noise, Loop, toxi, Flowfield*/
//*************************************************
document.addEventListener("DOMContentLoaded", function (event) {
	"use strict";
    var ctx = document.getElementById("canvas").getContext("2d"),
        width = ctx.canvas.width = window.innerWidth,
        height = ctx.canvas.height = window.innerHeight,
        mouseClick = false,
        vehicle = new Vehicle(width, height, width / 2, height / 2),
        target = new Vector2(width / 2, height / 2),
        targetSpeed = new Vector2(0, 0),
        loop = new Loop(),
        rows = 20,
        cols = 20,
        field = new Flowfield(cols, rows, width, height);
        
    function animate() {
        requestAnimationFrame(animate);
        loop.update();
        field.updatePerlin();
        var force = vehicle.flowFieldFollowing(field);
        vehicle.applyForce(force);
        vehicle.update();
              
        ctx.clearRect(0, 0, width, height);
        field.display(ctx);
        vehicle.display(ctx);
    }
        
    function move(event) {
        event.preventDefault();
        if (mouseClick === false) { return; }
        
        var x = event.clientX - ctx.canvas.clientLeft,
            y = event.clientY - ctx.canvas.clientTop - 16,
            lastTarget = target;
        
        target = new Vector2(x, y);
        targetSpeed = target.sub(lastTarget);
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