/*global Liquid, Vector2, Mover, requestAnimationFrame, noise, MouseAttractor*/
//*************************************************
document.addEventListener("DOMContentLoaded", function (event) {
	"use strict";
    var ctx = document.getElementById("canvas").getContext("2d"),
        width = ctx.canvas.width = window.innerWidth,
        height = ctx.canvas.height = window.innerHeight,
        movers = [],
        attractor = new MouseAttractor(width, height, 30, ctx.canvas.clientLeft, ctx.canvas.clientTop),
        i = 0,
        j = 0;
    
    ctx.globalAlpha = 0.3;
    for (i = 0; i < 200; i += 1) {
        movers[i] = new Mover(width, height, 0, 0, 10);
        movers[i].initRandomly();
    }
    
	function animate() {
		requestAnimationFrame(animate);
        ctx.clearRect(0, 0, width, height);
        
        for (i = 0; i < movers.length; i += 1) {
            for (j = 0; j < movers.length; j += 1) {
                if (i !== j) {
                    movers[i].attract(movers[j]);
                }
            }
            attractor.applyOn(movers[i]);
            movers[i].update(true);
            movers[i].display(ctx);
        }
	}
	window.requestAnimationFrame(animate);
});
