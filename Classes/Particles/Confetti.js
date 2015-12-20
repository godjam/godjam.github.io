/*global Vector2, Particle, Tools*/
function Confetti(location, baseColor, scene, decrease, theta, variability, speed) {
    "use strict";
    var color = Color.createBrightColor().h;
    Particle.call(this, location, color, scene, decrease, theta, variability, speed);
    
    var angle = Tools.map(location.x, 0, scene.width, 0, Math.PI * 2);
    this.applyTorque(angle);
}
Confetti.prototype = Object.create(Particle.prototype);
Confetti.prototype.constructor = Confetti;

Confetti.prototype.display = function (ctx) {
	"use strict";
    this.mover.display(ctx);
};
