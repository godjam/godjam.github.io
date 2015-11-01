/*global console, requestAnimationFrame, Vehicle, Vector2*/
//*************************************************
document.addEventListener("DOMContentLoaded", function (event) {
	"use strict";
    var ctx = document.getElementById("canvas").getContext("2d"),
        width = ctx.canvas.width = window.innerWidth,
        height = ctx.canvas.height = window.innerHeight,
        mouseClick = false,
        lastLoop = new Date(),
        vehicle0 = new Vehicle(width, height, width / 2, height / 2),
        vehicle1 = new Vehicle(width, height, width / 2, height / 2),
        target = new Vector2(width / 2, height / 2),
        targetSpeed = new Vector2(0, 0);
    
    vehicle0.fillStyle = "#ffaa22";
    
    function animate() {
        requestAnimationFrame(animate);
        var f0 = null, f1 = null;
        f0 = vehicle0.pursuit(target, targetSpeed);
        vehicle0.applyForce(f0);
        vehicle0.update();
        
        f1 = vehicle1.seek(target);
        vehicle1.applyForce(f1);
        vehicle1.update();
        
        ctx.clearRect(0, 0, width, height);
        vehicle0.display(ctx);
        vehicle1.display(ctx);
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