/*global requestAnimationFrame, MouseEvtListener, Loop, RecursiveTree*/
//*************************************************
document.addEventListener("DOMContentLoaded", function (event) {
	"use strict";
    var ctx = document.getElementById("canvas").getContext("2d"),
        width = ctx.canvas.width = window.innerWidth,
        height = ctx.canvas.height = window.innerHeight,
        loop = new Loop(),
        tree = new RecursiveTree();

    
    function animate() {
        //requestAnimationFrame(animate);

        ctx.clearRect(0, 0, width, height);
        tree.display(ctx);
        
        var delta = loop.update();
        loop.display(ctx);
    }
    
	window.requestAnimationFrame(animate);
});