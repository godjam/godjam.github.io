/*global toxi, console, requestAnimationFrame, ToxiParticle, Array2D, LineCluster, Cluster*/
var Rect = toxi.geom.Rect,
    Vec2D = toxi.geom.Vec2D,
    GravityBehavior = toxi.physics2d.behaviors.GravityBehavior,
    VerletPhysics2D = toxi.physics2d.VerletPhysics2D,
    VerletSpring2D = toxi.physics2d.VerletSpring2D;


//*************************************************
document.addEventListener("DOMContentLoaded", function (event) {
	"use strict";
    var ctx = document.getElementById("canvas").getContext("2d"),
        width = ctx.canvas.width = window.innerWidth,
        height = ctx.canvas.height = window.innerHeight,
        physics = new VerletPhysics2D(),
        cluster = new Cluster(new Vec2D(width / 2, 50), physics);
    
    physics.setWorldBounds(new Rect(0, 0, width, height));
    physics.addBehavior(new GravityBehavior(new Vec2D(0, 0.5)));
    
    function animate() {
        requestAnimationFrame(animate);
        physics.update();
        ctx.clearRect(0, 0, width, height);
        cluster.display(ctx);
    }
    
    function move(event) {
        event.preventDefault();
        var x = event.clientX - ctx.canvas.clientLeft,
            y = event.clientY - ctx.canvas.clientTop - 16;
    }
    
    function mouseDown(event) {
        event.preventDefault();
    }

    function mouseUp(event) {
        event.preventDefault();
    }
    
	window.requestAnimationFrame(animate);
    
    // attach event listener to the doc
    document.addEventListener("mousedown", mouseDown.bind(this));
    document.addEventListener("mouseup", mouseUp.bind(this));
    document.addEventListener("mousemove", move.bind(this));
    document.addEventListener("touchmove", move.bind(this));
});