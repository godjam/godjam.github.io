/*global Oscillator, Pendulum, Mover, Spring, Gravity, requestAnimationFrame*/
//*************************************************
document.addEventListener("DOMContentLoaded", function (event) {
	"use strict";
    var ctx = document.getElementById("canvas").getContext("2d"),
        width = ctx.canvas.width = window.innerWidth,
        height = ctx.canvas.height = window.innerHeight,
        oscillator = new Oscillator(width, height),
        //pendulum0 = new Pendulum(width / 2, 0, width / 4, Math.PI / 2),
        //pendulum1 = new Pendulum(width / 2, 0, width / 5, Math.PI / 2),
        gravity = new Gravity(0, 0.1),
        spring0 = new Spring(width / 2, 0, height / 4),
        friction = new Friction(0.2),
        mover0 = new Mover(Math.random() * width,
                            height / 2,
                            this, 20);
        //mover1 = new Mover(width, height, this, 30);
    //ctx.globalAlpha = 0.2;
	function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, width, height);
        //oscillator.update();
        //oscillator.display(ctx);
        //pendulum0.constains(mover0);
        //pendulum1.origin = pendulum0.location;
        //pendulum1.constains(mover1);
        //pendulum0.display(ctx);
        //pendulum1.display(ctx);
        
        spring0.applyOn(mover0);
        gravity.applyOn(mover0);
        friction.applyOn(mover0);
        mover0.update(ctx, false);
        spring0.display(ctx);
        mover0.display(ctx);
        //mover1.display(ctx);
    }

	window.requestAnimationFrame(animate);
});