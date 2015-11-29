/*global Vector2, Emitter, requestAnimationFrame, Mover, MouseAttractor, Gravity, Attractor*/
//*************************************************
document.addEventListener("DOMContentLoaded", function (event) {
	"use strict";
    var ctx = document.getElementById("canvas").getContext("2d"),
        width = ctx.canvas.width = window.innerWidth,
        height = ctx.canvas.height = window.innerHeight,
        mover = new Mover(width, height, width / 2, height / 2,  15),
        emitter = new Emitter(mover, 1),
        attractor = new Attractor(0, 0, 30, 3),
        mouseAttractor = new MouseAttractor(this, attractor),
        gravity = new Gravity(0, 0.2);
    
    ctx.globalAlpha = 0.6;
	function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, width, height);
        mouseAttractor.applyOn(mover);
        mouseAttractor.display(ctx);
        mover.update(true);
        mover.display(ctx);
        emitter.apply(gravity);
        emitter.step(ctx);
        emitter.addParticle();
    }

	window.requestAnimationFrame(animate);
});