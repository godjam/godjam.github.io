/*global console, requestAnimationFrame, TouchEvent, Loop, Vector2, Vehicle, Path, BinLatSpatialSubdiv*/
//*************************************************
document.addEventListener("DOMContentLoaded", function (event) {
	"use strict";
    var ctx = document.getElementById("canvas").getContext("2d"),
        width = ctx.canvas.width = window.innerWidth,
        height = ctx.canvas.height = window.innerHeight,
        mouseClick = false,
        loop = new Loop(),
        target = new Vector2(width / 2, height / 2),
        path = new Path(width, height, 4),
        lattice = new BinLatSpatialSubdiv(6, 3, width, height),
        vehicles = [],
        v = null,
        i = 0;
        
    for (i = 0; i < 10; i += 1) {
        v = new Vehicle(width, height, Math.random() * width, Math.random() * height);
        v.mover.velocity.x = Math.random() * 10 - 5;
        v.mover.velocity.y = Math.random() * 10 - 5;
        vehicles.push(v);
    }
    
    function animate() {
        var i = 0,
            neighbors = null,
            sep = null,
            ali = null,
            coh = null,
            pat = null;
        requestAnimationFrame(animate);
        loop.update();
        lattice.clear();
        
        ctx.clearRect(0, 0, width, height);
        lattice.display(ctx);
        path.display(ctx);
        for (i = 0; i < vehicles.length; i += 1) {
            lattice.add(vehicles[i]);
        }
        
        for (i = 0; i < vehicles.length; i += 1) {
            neighbors = lattice.getNeighbors(vehicles[i]);
            pat = vehicles[i].pathFollowing(path);
            sep = vehicles[i].separate(neighbors);
            ali = vehicles[i].align(neighbors);
            coh = vehicles[i].cohesion(neighbors);
            vehicles[i].applyForce(sep, 1.0);
            vehicles[i].applyForce(ali, 1.0);
            vehicles[i].applyForce(coh, 1.5);
            vehicles[i].applyForce(sep, 2.0);
            vehicles[i].update();
            vehicles[i].display(ctx);
        }
        loop.display(ctx);
    }
        
    function move(event) {
        event.preventDefault();
        var x = null, y = null;
        
        if (event instanceof TouchEvent && event.touches.length > 0) {
            x = event.touches[0].clientX;
            y = event.touches[0].clientY;
        } else if (mouseClick === true) {
            x = event.clientX;
            y = event.clientY;
        }
        
        if (x !== null && y !== null) {
            x -= ctx.canvas.clientLeft;
            y -= ctx.canvas.clientTop + 16;
            target = new Vector2(x, y);
        }
    }
    
    function touchMove(event) {
        event.preventDefault();
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