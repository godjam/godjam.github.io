/*global Vector2, Mover, requestAnimationFrame, Gravity, MouseAttractor, RandomForce, Oscillation*/
/* 
 * TODO : projet "artificial life" : trouver un moyen d'appliquer des forces différentes aux movers
 * A cette étape il y avait 3 types de "movers" differents (donc de forces)
 * 1) gravité
 * 2) Rnd acceleration (= mouche)
 * 3) "followers" (= attirés par la souris)
 */
//*************************************************
document.addEventListener("DOMContentLoaded", function (event) {
	"use strict";
    var ctx = document.getElementById("canvas").getContext("2d"),
        width = ctx.canvas.width = window.innerWidth,
        height = ctx.canvas.height = window.innerHeight,
        i = 0,
        movers = [],
        gravity = new Gravity(0, 0.2),
        rndFly = new RandomForce(true),
        oscillation = new Oscillation(width / 30, Math.PI / 10),
        attractor = new MouseAttractor(width,
                                        height,
                                        30,
                                        ctx.canvas.clientLeft,
                                        ctx.canvas.clientTop);
    
    for (i = 0; i < 1; i += 1) {
        movers[i] = new Mover(width, height, 0, 0, 30);
        movers[i].initRandomly();
    }
    
	function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, width, height);
        
        oscillation.applyOn(movers[0]);
        oscillation.display(ctx);
        // gravité sur 0, 1, 2, 3
        // follow sur 1 et 2
        // random sur 5
        /*
        gravity.applyOn(movers[0]);
        gravity.applyOn(movers[1]);
        gravity.applyOn(movers[2]);
        gravity.applyOn(movers[3]);
        attractor.applyOn(movers[1]);
        attractor.applyOn(movers[2]);
        rndFly.applyOn(movers[5]);
        */
        for (i = 0; i < movers.length; i += 1) {
            movers[i].update(true);
            movers[i].display(ctx);
        }
    }

	window.requestAnimationFrame(animate);
});
