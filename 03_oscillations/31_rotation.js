/*global Liquid, Vector2, Mover, requestAnimationFrame, noise, Attractor*/
//*************************************************
document.addEventListener("DOMContentLoaded", function (event) {
	"use strict";
    var ctx = document.getElementById("canvas").getContext("2d"),
        width = ctx.canvas.width = window.innerWidth,
        height = ctx.canvas.height = window.innerHeight,
        v1 = new Vector2(width / 2, height / 2 - 40),
        v2 = new Vector2(width / 2, height / 2 + 40),
        v0 = new Vector2(width / 2, height / 2),
        angle = Math.PI / 100;
    
	function animate() {
        
		requestAnimationFrame(animate);
        ctx.clearRect(0, 0, width, height);
        
        ctx.fillRect(v1.x, v1.y, 10, 10);
        ctx.fillRect(v2.x, v2.y, 10, 10);
        ctx.stroke();
        
        v1.rotateInPlace(angle, v0);
        v2.rotateInPlace(angle, v0);
	}

	window.requestAnimationFrame(animate);
});
