/*global Liquid, Vector2, Mover, requestAnimationFrame, noise, Wind, Gravity, Friction*/
//*************************************************
var HeliumBalloonScene = function () { {
	"use strict";
    var movers = [],
        liquid = new Liquid(width / 2, height / 2, height / 2, height / 2, 0.1),
        wind = new Wind(0.01, 0),
        gravity = new Gravity(0, 0.1),
        friction = new Friction(0.02),
        i = 0;
    
    for (i = 0; i < 100; i += 1) {
        movers[i] = new Mover(width, height, 0, 0, 10);
        movers[i].initRandomly();
    }
    
	function animate() {
        
		requestAnimationFrame(animate);
        ctx.clearRect(0, 0, width, height);
        
        for (i = 0; i < movers.length; i += 1) {
            //var ax = noise.perlin2(mouse.x / 100, mouse.y / 100),
            //    ay = noise.perlin2(mouse.y / 100, mouse.x / 100);
            //movers[i].applyForce(new Vector2(ax, 0));
            
            //
            if (liquid.applyOn(movers[i]) === false) {
                gravity.applyOn(movers[i]);
                wind.applyOn(movers[i]);
                friction.applyOn(movers[i]);
            }
                            
            movers[i].update(true);
            movers[i].display(ctx);
        }
        liquid.display(ctx);
	}

	window.requestAnimationFrame(animate);
});
