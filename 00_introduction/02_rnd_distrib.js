document.addEventListener("DOMContentLoaded", function (event) {
    "use strict";
    var randomCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ctx = document.getElementById('canvas').getContext('2d'),
        width = ctx.canvas.width = window.innerWidth,
        height = ctx.canvas.height = window.innerHeight;

	function animate() {
		requestAnimationFrame(animate);

        var idx = Math.floor(Math.random() * randomCount.length),
            x = 0,
            y = 0,
            h = 0,
            i = 0,
            w = width / randomCount.length;
        randomCount[idx] += 1;

        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        
        for (i = 0; i < randomCount.length; i += 1) {
            x = i * w;
            y = height - randomCount[i];
            h = randomCount[i];
            ctx.rect(x, y, w - 1, h);
            ctx.fill();
            ctx.stroke();
        }
        ctx.closePath();
	}

	window.requestAnimationFrame(animate);
});
