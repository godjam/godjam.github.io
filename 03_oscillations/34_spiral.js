/*global Vector2, requestAnimationFrame*/
//*************************************************
document.addEventListener("DOMContentLoaded", function (event) {
	"use strict";
    var ctx = document.getElementById("canvas").getContext("2d"),
        width = ctx.canvas.width = window.innerWidth,
        height = ctx.canvas.height = window.innerHeight,
        v1 = new Vector2(0, 0),
        r = 0,
        theta = 0,
        i = 0;
        
	function animate() {
		requestAnimationFrame(animate);
        
        for (i = 0; i < 50; i += 1) {
            v1 = Vector2.fromPolar(r, theta);
            ctx.beginPath();
            ctx.arc(width / 2 + v1.x, height / 2 + v1.y, 10, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();

            theta += Math.PI / 250;
            r += 0.05;
        }
	}

	window.requestAnimationFrame(animate);
});
