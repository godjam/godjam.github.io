/*global console, requestAnimationFrame, Vector2*/
//*************************************************
document.addEventListener("DOMContentLoaded", function (event) {
	"use strict";
    var ctx = document.getElementById("canvas").getContext("2d"),
        width = ctx.canvas.width = window.innerWidth,
        height = ctx.canvas.height = window.innerHeight,
        mouseClick = false,
        loop = new Loop(),
        center = new Vector2(width / 2, height / 2),
        v1 = new Vector2(0, 100),
        v2 = new Vector2(100, 0);

    function animate() {
        requestAnimationFrame(animate);
        loop.update();
        var dot = v1.dot(v2),
            theta = Vector2.getAngleBetween(v1, v2);

        ctx.clearRect(0, 0, width, height);
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(center.x, center.y);
        ctx.lineTo(center.x + v1.x, center.y + v1.y);
        ctx.moveTo(center.x, center.y);
        ctx.lineTo(center.x + v2.x, center.y + v2.y);
        ctx.stroke();
        ctx.font = "16px verdana";
        ctx.fillText("theta (rad): " + theta, 10, 30);
        ctx.fillText("theta (deg): " + Vector2.toDegree(theta), 10, 45);
        ctx.fillText("dot product: " + dot, 10, 60);
        ctx.closePath();
        ctx.restore();
    }

    function move(event) {
        event.preventDefault();
        if (mouseClick === false) { return; }
        var zero = new Vector2(0, 0);
        v1.rotateInPlace(Math.PI / 100, zero);

        //var x = event.clientX - ctx.canvas.clientLeft,
        //    y = event.clientY - ctx.canvas.clientTop - 16;
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