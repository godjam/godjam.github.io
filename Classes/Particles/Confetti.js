/*global Vector2, Particle*/
function Confetti() {
    "use strict";
}

Confetti.prototype.display = function (particle, ctx) {
	"use strict";
    if (particle instanceof Particle === false) {
        throw "Confetti.display : param is not a Particle";
    }
    
    var c = 256 - particle.lifespan;
    ctx.save();
    ctx.fillStyle = 'rgb(' + c + ', ' + c + ', ' + c + ')';
    ctx.beginPath();
    ctx.rect(particle.mover.location.x - 4,
             particle.mover.location.y - 4,
             8,
             8);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
};
